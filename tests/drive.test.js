import test from 'node:test';
import assert from 'node:assert/strict';
import { createDriveService, parsePublicFolder } from '../server/drive.js';

const folderMime = 'application/vnd.google-apps.folder';
const folder = (id, name) => ({ id, name, mimeType: folderMime });
const photo = (id, name, modifiedTime = '2026-11-16T00:00:00Z') => ({ id, name, mimeType: 'image/jpeg', modifiedTime });
const encodeFolder = (entries) => {
  const data = JSON.stringify([entries.map((file) => {
    const item = [file.id, [], file.name, file.mimeType];
    item[10] = Date.parse(file.modifiedTime || '2026-11-16');
    return item;
  })]);
  return `<script>window['_DRIVE_ivd'] = '${data.replace(/[\[\]"']/g, (char) => `\\x${char.charCodeAt(0).toString(16)}`)}';</script>`;
};

test('public folder parsing decodes escaped names without executing page scripts', () => {
  const entries = parsePublicFolder(encodeFolder([photo('photo_identifier_01', "Our photo's title")]));
  assert.equal(entries[0].name, "Our photo's title");
  assert.equal(entries[0].mimeType, 'image/jpeg');
  assert.throws(() => parsePublicFolder('<html>Sign in</html>'), /UNAVAILABLE/);
  assert.throws(() => parsePublicFolder(encodeFolder([photo('bad', 'Image')])));
});

test('large public-folder listings fail explicitly instead of silently truncating albums', () => {
  const photos = Array.from({ length: 50 }, (_, index) => photo(`photo_identifier_${index}`, `${index}.jpg`));
  assert.throws(() => parsePublicFolder(encodeFolder(photos)), /API_KEY_NEEDED/);
});

test('live albums refresh additions and removals, and image proxy rejects files outside the shared albums', async () => {
  let time = 0;
  let rootRequests = 0;
  let previewRequests = 0;
  let albumPhotos = [photo('photo_identifier_01', '01.jpg')];
  const folders = {
    root_identifier: [folder('college_identifier', 'College Days'), folder('portraits_identifier', 'Portraits'), folder('misc_identifier', 'Misc')],
    portraits_identifier: [folder('udeshya_identifier', 'Udeshya')],
    udeshya_identifier: [photo('portrait_identifier_old', 'Old.jpg', '2026-01-01'), photo('portrait_identifier_new', 'New.jpg', '2026-11-16')],
  };
  const service = createDriveService({
    folderId: 'root_identifier', now: () => time,
    fetchImpl: async (input) => {
      const url = new URL(input);
      if (url.pathname === '/thumbnail') {
        previewRequests++;
        return new Response('image bytes', { headers: { 'Content-Type': 'image/jpeg' } });
      }
      const id = url.pathname.split('/').pop();
      if (id === 'root_identifier') rootRequests++;
      return new Response(encodeFolder(id === 'college_identifier' ? albumPhotos : folders[id]));
    },
  });
  const [first, concurrent] = await Promise.all([service.getGallery(), service.getGallery()]);
  assert.equal(first, concurrent);
  assert.equal(rootRequests, 1);
  assert.equal(first.images.length, 1);
  assert.ok(first.images.every((image) => image.category !== 'misc'));
  assert.equal(await service.getPhoto('misc_photo_identifier', 720), null);
  assert.equal(first.portraits.udeshya.id, 'portrait_identifier_new');
  assert.ok(first.images[0].src.startsWith('/api/gallery?'));
  assert.equal(await service.getPhoto('outside_identifier', 720), null);
  assert.equal(previewRequests, 0);
  assert.equal((await service.getPhoto('photo_identifier_01', 720)).headers.get('content-type'), 'image/jpeg');
  albumPhotos = [photo('photo_identifier_02', '02.jpg')];
  assert.equal((await service.getGallery()).images[0].id, 'photo_identifier_01');
  time = 31000;
  const refreshed = await service.getGallery();
  assert.equal(refreshed.images[0].id, 'photo_identifier_02');
  assert.equal(await service.getPhoto('photo_identifier_01', 720), null);
});

test('official API mode follows pagination and excludes non-image files', async () => {
  let pageTwoRequested = false;
  const service = createDriveService({
    folderId: 'root_identifier', apiKey: 'test-key',
    fetchImpl: async (input) => {
      const url = new URL(input);
      assert.equal(url.hostname, 'www.googleapis.com');
      assert.equal(url.searchParams.get('key'), 'test-key');
      if (url.searchParams.get('q').includes('root_identifier')) {
        return Response.json({ files: [folder('together_identifier', 'Together')] });
      }
      if (url.searchParams.get('pageToken') === 'second-page') {
        pageTwoRequested = true;
        return Response.json({ files: [photo('photo_identifier_02', '02.jpg')] });
      }
      return Response.json({
        files: [photo('photo_identifier_01', '01.jpg'), { id: 'document_identifier', name: 'Notes.txt', mimeType: 'text/plain' }],
        nextPageToken: 'second-page',
      });
    },
  });
  const gallery = await service.getGallery();
  assert.equal(gallery.images.length, 2);
  assert.ok(pageTwoRequested);
  assert.ok(gallery.images.every((image) => image.category === 'together'));
});

test('image proxy refuses Google error pages instead of serving HTML as a photo', async () => {
  const service = createDriveService({
    folderId: 'root_identifier',
    fetchImpl: async (input) => {
      const url = new URL(input);
      if (url.pathname === '/thumbnail') return new Response('<html>Sign in</html>', { headers: { 'Content-Type': 'text/html' } });
      return new Response(encodeFolder(url.pathname.endsWith('root_identifier')
        ? [folder('college_identifier', 'College Days')]
        : [photo('photo_identifier_01', 'Photo.jpg')]));
    },
  });
  await assert.rejects(service.getPhoto('photo_identifier_01', 720), /PHOTO_UNAVAILABLE/);
});

test('guest photos are hidden in Misc and become visible only after the owner moves them into an album', async () => {
  let time = 0;
  let reviewed = false;
  const guestPhoto = photo('guest_photo_identifier', 'Guest photo.jpg');
  const service = createDriveService({
    folderId: 'root_identifier', now: () => time,
    fetchImpl: async (input) => {
      const id = new URL(input).pathname.split('/').pop();
      if (id === 'misc_identifier') throw new Error('The review folder must not be listed');
      const contents = id === 'root_identifier'
        ? [folder('college_identifier', 'College Days'), folder('misc_identifier', 'Misc')]
        : reviewed ? [guestPhoto] : [];
      return new Response(encodeFolder(contents));
    },
  });
  assert.equal((await service.getGallery()).images.length, 0);
  assert.equal(await service.getPhoto(guestPhoto.id, 720), null);
  reviewed = true;
  time = 31000;
  const published = await service.getGallery();
  assert.equal(published.images.length, 1);
  assert.equal(published.images[0].category, 'college');
  assert.equal(published.images[0].id, guestPhoto.id);
});
