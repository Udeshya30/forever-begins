import { MAX_PHOTO_BYTES } from '../src/utils/uploadLimits.js';

const maxJsonBytes = Math.ceil(MAX_PHOTO_BYTES / 3) * 4 + 4096;
const scriptUrlPattern = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/;

export function validateUpload(body) {
  if (!body || !/^[a-f\d-]{36}$/i.test(body.uploadId || '')) throw new Error('Please select the photo again.');
  if (typeof body.data !== 'string' || body.data.length > Math.ceil(MAX_PHOTO_BYTES / 3) * 4) throw new Error('This photo is too large to send.');
  if (body.mimeType !== 'image/jpeg' || !/^[A-Za-z\d+/]+={0,2}$/.test(body.data)) throw new Error('Please choose a supported photo.');
  const bytes = Buffer.from(body.data, 'base64');
  if (bytes.length < 4 || bytes.length > MAX_PHOTO_BYTES || bytes.toString('base64') !== body.data || bytes[0] !== 255 || bytes[1] !== 216 || bytes[2] !== 255) {
    throw new Error('Please choose a valid photo.');
  }
  return {
    uploadId: body.uploadId, data: body.data, mimeType: 'image/jpeg',
    guestName: typeof body.guestName === 'string' ? body.guestName.trim().slice(0, 80) : '',
    note: typeof body.note === 'string' ? body.note.trim().slice(0, 500) : '',
  };
}

async function readJson(req) {
  if (Number(req.headers['content-length']) > maxJsonBytes) throw new Error('This photo is too large to send.');
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    if (Buffer.byteLength(JSON.stringify(req.body)) > maxJsonBytes) throw new Error('This photo is too large to send.');
    return req.body;
  }
  if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) {
    if (Buffer.byteLength(req.body) > maxJsonBytes) throw new Error('This photo is too large to send.');
    return JSON.parse(req.body.toString());
  }
  let length = 0;
  const chunks = [];
  for await (const chunk of req) {
    length += chunk.length;
    if (length > maxJsonBytes) throw new Error('This photo is too large to send.');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export function createUploadHandler({ scriptUrl = '', secret = '', fetchImpl = fetch } = {}) {
  const ready = scriptUrlPattern.test(scriptUrl) && secret.length >= 32;
  return async function handleUpload(req, res) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    const send = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)); };
    if (req.method === 'GET') return send(200, { ready });
    if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return send(405, { error: 'Method not allowed.' }); }
    if (!ready) return send(503, { error: 'Photo sharing is not open yet. Please try again later.' });
    const origin = req.headers.origin;
    let foreignOrigin = req.headers['sec-fetch-site'] === 'cross-site';
    if (origin) {
      try { foreignOrigin ||= new URL(origin).host !== (req.headers['x-forwarded-host'] || req.headers.host); }
      catch { foreignOrigin = true; }
    }
    if (foreignOrigin) {
      return send(403, { error: 'Please share photos from our wedding website.' });
    }
    if (!req.headers['content-type']?.startsWith('application/json')) return send(415, { error: 'Please choose a supported photo.' });
    let payload;
    try { payload = validateUpload(await readJson(req)); }
    catch (error) { return send(400, { error: error instanceof SyntaxError ? 'Please select the photo again.' : error.message }); }
    try {
      const response = await fetchImpl(scriptUrl, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, secret }), signal: AbortSignal.timeout(45000),
      });
      if (!response.ok) throw new Error('Upload unavailable');
      const result = await response.json();
      if (result.ok !== true || typeof result.fileId !== 'string') throw new Error('Upload was not confirmed');
      return send(200, { ok: true, uploadId: payload.uploadId });
    } catch {
      return send(502, { error: 'We couldn’t confirm this photo was received. Please retry; the same photo won’t be saved twice.' });
    }
  };
}
