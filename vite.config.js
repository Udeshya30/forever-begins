import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import galleryHandler from './api/gallery.js'
import uploadHandler from './api/upload.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const installGallery = (server) => {
    server.middlewares.use((req, res, next) => {
      if (req.url?.split('?')[0] === '/api/upload') {
        return uploadHandler(req, res, {
          scriptUrl: env.DRIVE_UPLOAD_SCRIPT_URL || process.env.DRIVE_UPLOAD_SCRIPT_URL || '',
          secret: env.DRIVE_UPLOAD_SECRET || process.env.DRIVE_UPLOAD_SECRET || '',
        }).catch(next)
      }
      if (req.url?.split('?')[0] !== '/api/gallery') return next()
      galleryHandler(req, res, { apiKey: env.GOOGLE_DRIVE_API_KEY || process.env.GOOGLE_DRIVE_API_KEY || '' }).catch(next)
    })
  }
  return {
    plugins: [react(), {
      name: 'live-drive-gallery',
      configureServer: installGallery,
      configurePreviewServer: installGallery,
    }],
  }
})
