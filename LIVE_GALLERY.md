# Live Google Drive photo albums

The website reads GOOGLE_DRIVE_FOLDER_URL and GOOGLE_DRIVE_MISC_FOLDER_URL from the server environment at runtime. Both are populated in your local .env. They accept shared folder URLs or raw IDs. Album labels remain in src/data/driveConfig.js; personal folder IDs are not hardcoded there. No personal photo copies are stored in public/ or included in the build. A small server endpoint lists files and streams Google-generated image previews to the browser. Normal browser/CDN caches may temporarily cache those responses; they are not saved as project files.

## Folder structure

Keep these names under the parent folder:

```text
Forever Begins/
  College Days/
  Together/
  With Our Families/
  Wedding Celebrations/
  Portraits/
    Udeshya/
    Bhanu/
```

The first four folders populate gallery categories. Nested folders within each album are included. The most recently modified image in each person's Portraits folder appears in their Meet section. If a portrait folder is empty, its illustrated hometown remains as the fallback. Non-image files are ignored.

Guest uploads go into a separate Misc child folder and are deliberately excluded from the gallery. Move reviewed photos from Misc into a published album to make them visible. See GUEST_UPLOADS.md for the one-time write-connection setup.

Keep the parent folder and included photos accessible to Anyone with the link as Viewer, with image previews enabled. Limited-access subfolders cannot be read anonymously. Include only photos you want website guests to see.

## Adding and removing photos

Upload or remove photos in these folders. No import command or deployment is needed for photo changes. Albums refresh when opened and approximately once per minute while visible; server/CDN caching can add another short delay. Allow roughly one to two minutes plus Google's own propagation time. Refresh the browser or use Try again after an error.

File names determine gallery ordering (prefix 01, 02, etc. to control the order). Captions use album names instead of automatically publishing camera file names. The viewer can open an original on Drive. Website previews are requested at 720 pixels for the grid and 1600 for the viewer; Google may return a smaller image if the original is small.

## Running and hosting

- npm run dev: Vite middleware serves /api/gallery locally.
- npm run preview: the same endpoint works with the production preview.
- Vercel: api/gallery.js runs as a Node function. The SPA rewrite excludes /api/.
- Set GOOGLE_DRIVE_FOLDER_URL and GOOGLE_DRIVE_MISC_FOLDER_URL in Vercel's server environment as well as your local .env. Do not prefix them with VITE_.
- Static-only hosts without functions cannot run this live endpoint.
- Restart an already-running dev server if it has not picked up the changed Vite configuration.

## Public-folder mode and optional supported API

No credentials are needed for the current public-folder mode, which reads Google's anonymous folder web view. This is not an official listing API: Google can change its page format or restrict automated access. This mode explicitly rejects folders containing 50 or more entries because the public page can truncate larger listings.

For larger albums and a supported, paginated listing API, enable Google Drive API in your Google Cloud project and set GOOGLE_DRIVE_API_KEY in a local .env and your Vercel server environment. Restrict that key to Google Drive API; never prefix it with VITE_ or put it into client code. The same publicly shared folder is used, and guests do not sign into Google. With a key configured, listing uses the official API; image previews still depend on public Drive access.

Official references:
- Public-folder listing with an API key: https://developers.google.com/workspace/drive/api/guides/search-files
- Drive thumbnails and proxy guidance: https://developers.google.com/workspace/drive/api/reference/rest/v3/files
- Vite with Vercel functions: https://vercel.com/docs/frameworks/frontend/vite

## Failure behavior

An unavailable folder or Google request returns a retryable album error rather than an empty success response. Existing photos remain visible during a failed background refresh. Broken previews show a small unavailable message. Image requests are limited to file IDs found in the configured gallery/portrait folders; this is not a general-purpose Drive proxy. Changing sharing permissions may take a short cache interval to reach already-open pages.
