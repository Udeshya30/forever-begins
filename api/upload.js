import { createUploadHandler } from '../server/upload.js';

export const config = { maxDuration: 60 };
let handler;
let previousUrl;
let previousSecret;

export default async function uploadHandler(req, res, options = {}) {
  const scriptUrl = options.scriptUrl ?? process.env.DRIVE_UPLOAD_SCRIPT_URL ?? '';
  const secret = options.secret ?? process.env.DRIVE_UPLOAD_SECRET ?? '';
  if (!handler || previousUrl !== scriptUrl || previousSecret !== secret) {
    handler = createUploadHandler({ scriptUrl, secret });
    previousUrl = scriptUrl;
    previousSecret = secret;
  }
  return handler(req, res);
}
