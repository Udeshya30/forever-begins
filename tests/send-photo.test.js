import test from 'node:test';
import assert from 'node:assert/strict';
import { sendPhoto } from '../src/utils/sendPhoto.js';

function fakeRequest() {
  return { upload: {}, open(method, url) { this.method = method; this.url = url; }, setRequestHeader() {}, send(body) { this.body = body; } };
}

test('photo progress measures transferred bytes and waits for server confirmation before success', async () => {
  const request = fakeRequest();
  const progress = [];
  let transferred = false;
  let complete = false;
  const result = sendPhoto({ uploadId: 'same-id-for-retries' }, {
    createRequest: () => request,
    onProgress: (value) => progress.push(value),
    onTransferred: () => { transferred = true; },
  }).then((value) => { complete = true; return value; });
  assert.equal(request.method, 'POST');
  assert.equal(request.url, '/api/upload');
  assert.equal(JSON.parse(request.body).uploadId, 'same-id-for-retries');
  request.upload.onprogress({ lengthComputable: false, loaded: 100, total: 0 });
  assert.deepEqual(progress, []);
  request.upload.onprogress({ lengthComputable: true, loaded: 350, total: 1000 });
  assert.deepEqual(progress, [35]);
  request.upload.onload();
  await Promise.resolve();
  assert.equal(progress.at(-1), 100);
  assert.equal(transferred, true);
  assert.equal(complete, false);
  request.status = 200;
  request.responseText = JSON.stringify({ ok: true });
  request.onload();
  assert.deepEqual(await result, { ok: true });
  assert.equal(complete, true);
});

test('fully transferred requests still fail if Drive saving was not confirmed', async () => {
  for (const [status, responseText] of [[502, '{"error":"Please retry"}'], [200, '{"ok":false}'], [200, '<html>Error</html>'], [200, 'null']]) {
    const request = fakeRequest();
    const result = sendPhoto({}, { createRequest: () => request });
    request.upload.onload();
    request.status = status;
    request.responseText = responseText;
    request.onload();
    await assert.rejects(result);
  }
});

test('network errors, timeouts, and aborted requests produce retryable failures', async () => {
  for (const event of ['onerror', 'ontimeout', 'onabort']) {
    const request = fakeRequest();
    const result = sendPhoto({}, { createRequest: () => request });
    request[event]();
    await assert.rejects(result, /retry/i);
  }
});
