import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createUploadHandler, validateUpload } from '../server/upload.js';
import { MAX_PHOTO_BYTES } from '../src/utils/uploadLimits.js';

const payload = {
  uploadId: '12345678-1234-1234-1234-123456789abc', mimeType: 'image/jpeg',
  data: Buffer.from([255, 216, 255, 224, 0, 0, 255, 217]).toString('base64'),
  guestName: 'A guest', note: 'A lovely day!',
};
const setup = { scriptUrl: 'https://script.google.com/macros/s/test-deployment/exec', secret: 'a'.repeat(40) };

async function request(handler, { method = 'POST', body = payload, headers = {} } = {}) {
  let response;
  const req = { method, body, headers: { host: 'wedding.example', 'content-type': 'application/json', ...headers } };
  const res = { statusCode: 200, setHeader() {}, end(text) { response = { status: this.statusCode, body: JSON.parse(text) }; } };
  await handler(req, res);
  return response;
}

test('guest uploads remain closed until a valid server-only write connection exists', async () => {
  const handler = createUploadHandler();
  assert.deepEqual((await request(handler, { method: 'GET' })).body, { ready: false });
  assert.equal((await request(handler)).status, 503);
  const invalidConnection = createUploadHandler({ ...setup, scriptUrl: 'https://example.com/exec' });
  assert.equal((await request(invalidConnection)).status, 503);
});

test('validation rejects disguised and oversized files and bounds guest text', () => {
  assert.throws(() => validateUpload({ ...payload, data: Buffer.from('<script>bad</script>').toString('base64') }));
  assert.throws(() => validateUpload({ ...payload, data: 'A'.repeat(Math.ceil(MAX_PHOTO_BYTES / 3) * 4 + 4) }));
  assert.throws(() => validateUpload({ ...payload, mimeType: 'image/svg+xml' }));
  assert.throws(() => validateUpload({ ...payload, uploadId: '../outside-folder' }));
  assert.equal(validateUpload({ ...payload, guestName: 'x'.repeat(500), note: 'y'.repeat(2000) }).guestName.length, 80);
  assert.equal(validateUpload({ ...payload, note: 'y'.repeat(2000) }).note.length, 500);
});

test('upload success is returned only after Google confirms a saved file; secrets never reach the response', async () => {
  let forwarded;
  const handler = createUploadHandler({ ...setup, fetchImpl: async (url, options) => {
    assert.equal(url, setup.scriptUrl);
    forwarded = JSON.parse(options.body);
    return Response.json({ ok: true, fileId: 'saved_file_identifier' });
  } });
  const result = await request(handler);
  assert.equal(forwarded.secret, setup.secret);
  assert.equal(forwarded.uploadId, payload.uploadId);
  assert.equal(result.status, 200);
  assert.equal(result.body.ok, true);
  assert.ok(!JSON.stringify(result).includes(setup.secret));
  const denied = createUploadHandler({ ...setup, fetchImpl: async () => Response.json({ ok: false }) });
  assert.equal((await request(denied)).status, 502);
  const unavailable = createUploadHandler({ ...setup, fetchImpl: async () => { throw new Error('Network down'); } });
  assert.equal((await request(unavailable)).status, 502);
});

test('foreign origins and malformed bodies cannot write files', async () => {
  let calls = 0;
  const handler = createUploadHandler({ ...setup, fetchImpl: async () => { calls++; return Response.json({ ok: true, fileId: 'file_id' }); } });
  assert.equal((await request(handler, { headers: { origin: 'https://other.example' } })).status, 403);
  assert.equal((await request(handler, { headers: { origin: 'invalid' } })).status, 403);
  assert.equal((await request(handler, { body: '{bad json' })).status, 400);
  assert.equal((await request(handler, { method: 'DELETE' })).status, 405);
  assert.equal(calls, 0);
});

test('Apps Script saves only into Misc, records the message, and deduplicates a retry after manual review', () => {
  const properties = new Map([['UPLOAD_SECRET', setup.secret], ['WEDDING_PARENT_ID', 'parent_folder_identifier'], ['MISC_FOLDER_ID', 'misc_folder_identifier']]);
  const saved = [];
  const iterator = (items) => { let index = 0; return { hasNext: () => index < items.length, next: () => items[index++] }; };
  const misc = {
    getName: () => 'Misc', getFilesByName: () => iterator([]),
    getParents: () => iterator([{ getId: () => 'parent_folder_identifier' }]),
    createFile(blob) { const file = { getId: () => 'received_photo_id', setDescription(text) { file.description = text; } }; saved.push({ blob, file }); return file; },
  };
  const context = {
    console: { log() {} },
    PropertiesService: { getScriptProperties: () => ({
      getProperty: (key) => properties.get(key) || null,
      setProperty: (key, value) => properties.set(key, value),
      getProperties: () => Object.fromEntries(properties), deleteProperty: (key) => properties.delete(key),
    }) },
    DriveApp: { getFolderById: (id) => { assert.equal(id, 'misc_folder_identifier'); return misc; } },
    LockService: { getScriptLock: () => ({ waitLock() {}, hasLock: () => true, releaseLock() {} }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (text) => ({ setMimeType: () => JSON.parse(text) }) },
    Utilities: { base64Decode: (data) => [...Buffer.from(data, 'base64')], newBlob: (bytes, type, name) => ({ bytes, type, name }), formatDate: () => '2026-11-16' },
  };
  vm.createContext(context);
  vm.runInContext(readFileSync(new URL('../google-apps-script/GuestUploads.gs', import.meta.url), 'utf8'), context);
  const event = { postData: { contents: JSON.stringify({ ...payload, secret: setup.secret }) } };
  assert.equal(context.doPost(event).ok, true);
  assert.equal(context.doPost(event).ok, true);
  assert.equal(saved.length, 1);
  assert.ok(saved[0].file.description.includes('A lovely day!'));
  assert.ok(saved[0].blob.name.startsWith('guest-'));
  assert.equal(context.doPost({ postData: { contents: JSON.stringify({ ...payload, secret: 'wrong' }) } }).ok, false);
  assert.equal(saved.length, 1);
  properties.set('uploadCounter', JSON.stringify({ day: '2026-11-16', count: 300 }));
  const nextPhoto = { ...payload, uploadId: 'abcdef12-1234-1234-1234-123456789abc', secret: setup.secret };
  assert.equal(context.doPost({ postData: { contents: JSON.stringify(nextPhoto) } }).ok, false);
  assert.equal(saved.length, 1);
  context.DriveApp.getFolderById = () => ({ getParents: () => iterator([]) });
  assert.equal(context.doPost({ postData: { contents: JSON.stringify(nextPhoto) } }).ok, false);
  assert.equal(saved.length, 1);
});
