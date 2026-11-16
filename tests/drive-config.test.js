import { createDriveService } from '../server/drive.js';
import test from 'node:test';
import assert from 'node:assert/strict';
test('configured Misc is excluded even when renamed to a published album name', async () => {
  let requests = 0;
  const entry = ['review_identifier', [], 'Wedding Celebrations', 'application/vnd.google-apps.folder'];
  const html = `<script>window['_DRIVE_ivd'] = '${JSON.stringify([[entry]])}';</script>`;
  const service = createDriveService({
    folderId: 'https://drive.google.com/drive/folders/root_identifier',
    miscFolderId: 'https://drive.google.com/drive/folders/review_identifier',
    fetchImpl: async () => { requests++; return new Response(html); },
  });
  assert.equal((await service.getGallery()).images.length, 0);
  assert.equal(requests, 1);
});
