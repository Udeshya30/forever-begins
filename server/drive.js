import { driveAlbums } from '../src/data/driveConfig.js';
import { resolveDriveFolderId } from './driveConfig.js';

const folderType = 'application/vnd.google-apps.folder';
export const validDriveId = (id) => typeof id === 'string' && /^[\w-]{10,200}$/.test(id);

export function parsePublicFolder(html) {
  const match = html.match(/window\['_DRIVE_ivd'\]\s*=\s*'((?:\\.|[^'\\])*)';/);
  if (!match) throw new Error('DRIVE_FOLDER_UNAVAILABLE');
  const decoded = match[1].replace(/\\x([a-f\d]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  const data = JSON.parse(decoded);
  const entries = (data[0] || []).map((item) => ({
    id: item[0], name: item[2], mimeType: item[3],
    modifiedTime: typeof item[10] === 'number' ? new Date(item[10]).toISOString() : '',
  }));
  if (entries.some((item) => !validDriveId(item.id) || typeof item.name !== 'string' || typeof item.mimeType !== 'string')) {
    throw new Error('DRIVE_FOLDER_FORMAT_CHANGED');
  }
  // The public web view can truncate large folders. Never silently omit files.
  if (entries.length >= 50) throw new Error('DRIVE_API_KEY_NEEDED_FOR_LARGE_FOLDER');
  return entries;
}

export function createDriveService({ fetchImpl = fetch, now = Date.now, apiKey = '', folderId = process.env.GOOGLE_DRIVE_FOLDER_URL || '', miscFolderId = process.env.GOOGLE_DRIVE_MISC_FOLDER_URL || '' } = {}) {
  folderId = resolveDriveFolderId(folderId);
  miscFolderId = resolveDriveFolderId(miscFolderId);
  let cached = null;
  let expiresAt = 0;
  let pending = null;

  async function listFolder(id) {
    if (!validDriveId(id)) throw new Error('INVALID_FOLDER_ID');
    if (!apiKey) {
      const response = await fetchImpl(`https://drive.google.com/drive/folders/${id}`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(12000),
      });
      if (!response.ok) throw new Error('DRIVE_FOLDER_UNAVAILABLE');
      return parsePublicFolder(await response.text());
    }
    const files = [];
    let pageToken = '';
    do {
      const params = new URLSearchParams({
        key: apiKey, q: `'${id}' in parents and trashed = false`, pageSize: '1000',
        fields: 'nextPageToken,files(id,name,mimeType,modifiedTime,imageMediaMetadata(width,height))',
      });
      if (pageToken) params.set('pageToken', pageToken);
      const response = await fetchImpl(`https://www.googleapis.com/drive/v3/files?${params}`, { signal: AbortSignal.timeout(12000) });
      if (!response.ok) throw new Error('DRIVE_API_UNAVAILABLE');
      const result = await response.json();
      files.push(...(result.files || []));
      pageToken = result.nextPageToken || '';
    } while (pageToken);
    return files;
  }

  async function walk(id, seen = new Set(), depth = 0) {
    if (id === miscFolderId) return [];
    if (seen.has(id)) return [];
    if (depth > 5 || seen.size >= 100) throw new Error('DRIVE_FOLDER_LIMIT');
    seen.add(id);
    const entries = await listFolder(id);
    const files = entries.filter((entry) => entry.mimeType.startsWith('image/'));
    for (const child of entries.filter((entry) => entry.mimeType === folderType)) {
      files.push(...await walk(child.id, seen, depth + 1));
    }
    return files;
  }

  function photo(file, category, label, index) {
    if (!validDriveId(file.id)) throw new Error('INVALID_PHOTO_ID');
    const version = file.modifiedTime || '';
    const url = (size) => `/api/gallery?${new URLSearchParams({ image: file.id, size: String(size), v: version })}`;
    return {
      id: file.id, category, title: `${label} · ${index + 1}`,
      alt: `Photo ${index + 1} from ${label}`, src: url(1600), thumbnailSrc: url(720),
      driveUrl: `https://drive.google.com/file/d/${file.id}/view`,
      width: file.imageMediaMetadata?.width, height: file.imageMediaMetadata?.height,
    };
  }

  async function load() {
    const root = (await listFolder(folderId)).filter((file) => file.id !== miscFolderId);
    const matchFolder = (name, entries = root) => entries.find((file) => file.mimeType === folderType && file.name.toLowerCase().trim() === name.toLowerCase());
    const albums = await Promise.all(driveAlbums.map(async (album) => {
      const folder = matchFolder(album.folderName);
      const files = folder ? await walk(folder.id) : [];
      files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
      return files.map((file, index) => photo(file, album.id, album.displayName, index));
    }));
    const portraits = {};
    const portraitFolder = matchFolder('Portraits');
    if (portraitFolder) {
      const people = await listFolder(portraitFolder.id);
      await Promise.all(['Udeshya', 'Bhanu'].map(async (person) => {
        const folder = matchFolder(person, people);
        if (!folder) return;
        const images = await walk(folder.id);
        images.sort((a, b) => (b.modifiedTime || '').localeCompare(a.modifiedTime || '') || a.name.localeCompare(b.name));
        if (images[0]) portraits[person.toLowerCase()] = photo(images[0], person.toLowerCase(), person, 0);
      }));
    }
    return { images: albums.flat(), portraits, updatedAt: new Date(now()).toISOString() };
  }

  async function getGallery() {
    if (cached && now() < expiresAt) return cached;
    if (!pending) {
      pending = load().then((result) => {
        cached = result;
        expiresAt = now() + 30000;
        return result;
      }).finally(() => { pending = null; });
    }
    return pending;
  }

  async function getPhoto(id, size) {
    if (!validDriveId(id)) return null;
    const gallery = await getGallery();
    const allowed = [...gallery.images, ...Object.values(gallery.portraits)].some((image) => image.id === id);
    if (!allowed) return null;
    const response = await fetchImpl(`https://drive.google.com/thumbnail?${new URLSearchParams({ id, sz: `w${size}` })}`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error('DRIVE_PHOTO_UNAVAILABLE');
    return response;
  }

  return { getGallery, getPhoto };
}
