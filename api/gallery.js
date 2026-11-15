import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { createDriveService } from '../server/drive.js';

let service;
let serviceKey;

export default async function galleryHandler(req, res, options = {}) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.statusCode = 405;
    return res.end();
  }
  const apiKey = options.apiKey ?? process.env.GOOGLE_DRIVE_API_KEY ?? '';
  if (!service || apiKey !== serviceKey) {
    service = createDriveService({ apiKey });
    serviceKey = apiKey;
  }
  try {
    const url = new URL(req.url, 'http://localhost');
    const imageId = url.searchParams.get('image');
    if (imageId) {
      const size = url.searchParams.get('size') === '1600' ? 1600 : 720;
      const photo = await service.getPhoto(imageId, size);
      if (!photo) { res.statusCode = 404; return res.end(); }
      res.setHeader('Content-Type', photo.headers.get('content-type'));
      res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=60');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return await pipeline(Readable.fromWeb(photo.body), res);
    }
    const gallery = await service.getGallery();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=30');
    return res.end(JSON.stringify(gallery));
  } catch {
    if (res.headersSent) return res.destroy();
    res.statusCode = 503;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify({ error: 'The photo album is temporarily unavailable. Please try again shortly.' }));
  }
}
