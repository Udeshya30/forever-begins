# Guest photo uploads: review first, publish later

The guest page is /share-photos, linked in the menu and gallery. Guests choose photos, optionally add their name and a short message, preview selections, and submit. The website sends each photo to the existing Misc folder in your shared parent folder. **Misc is excluded from the public website gallery.** You manually review photos and move chosen ones into College Days, Together, With Our Families, or Wedding Celebrations. Only then will the existing live gallery pick them up.

## One-time Google setup still required

The public Viewer link can list and preview files; it cannot authorize uploads. No live Drive upload is possible until you authorize a write connection. The website's Google Drive API key, if configured for listing, also does not grant write permission. This implementation uses an Apps Script web app running as your Google account, so guests do not need to sign into Google or receive Editor access.

1. Open https://script.google.com/ using the Google account that owns or can write to the wedding folder. Create a new project named Forever Begins Guest Photos.
2. Your local .env contains GOOGLE_DRIVE_FOLDER_URL, GOOGLE_DRIVE_MISC_FOLDER_URL, and DRIVE_UPLOAD_SECRET. Run npm run prepare:drive-upload to generate the private tmp/drive-setup/GuestUploads.ready.gs from those settings. Paste that generated file into Code.gs and save it. Keep the generated file private and ignored by Git. The shared google-apps-script/GuestUploads.gs template contains no personal folder IDs; it reads the IDs from Apps Script properties, initialized by the prepared copy.
3. Select **setupUploads** in the function dropdown and click Run. Review Google's authorization request and authorize the script with the folder-owning account. The prepared copy initializes Script properties from .env and checks the destination; it does not upload a test photo. Regenerate and update the prepared script if you change either folder setting or the secret later.
4. Open **Project Settings → Script properties**. Copy the generated **UPLOAD_SECRET** value. Keep it private; do not paste it into chat or frontend source code.
5. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**, then deploy. Copy the deployment URL ending in /exec. Access is protected by the server's secret, which the web page never receives. If your account's administrator disables anonymous web apps, this deployment option may not be available.
6. Set these two server-only environment variables, locally in .env and in Vercel Project Settings → Environment Variables:

```text
DRIVE_UPLOAD_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
DRIVE_UPLOAD_SECRET=THE_VALUE_FROM_SCRIPT_PROPERTIES
```

7. Restart the local dev server, or redeploy the website after configuring Vercel. Visit /share-photos and submit a real test photo. Confirm it appears in Misc and does not appear in the gallery. Then move it to an album and confirm it appears there after the gallery's normal refresh interval.

Until these variables are configured, the page accurately shows that photo sharing is opening soon and submission is disabled. The presence of environment variables means the connection is configured, not that Google has been successfully authorized; perform step 7 to verify end to end. The current development session has not authorized or deployed this Google web app.

## Your review workflow

- Review uploaded photos in Misc. Each file's Drive description contains the guest's optional name and message. This information is not automatically published as a caption.
- Move selected photos to a public album folder. No rebuild or code edit is needed; allow around one to two minutes plus Google's propagation time.
- Leave unselected photos in Misc, or remove them in Google Drive.
- Misc is excluded from the website, but Google Drive permissions still apply. A publicly shared parent folder may expose its contents to someone holding the Drive link. Use a limited-access Misc folder if you also want the review queue private within Drive; the Apps Script owner must retain write access. Published album folders must remain readable by the live gallery.

## Limits and behavior

- JPG, PNG, and WebP inputs up to 25 MB; ten photos per batch.
- The browser prepares JPEG copies at a maximum 2000-pixel long edge and quality 85, removing camera metadata. Originals on the guest's device are untouched. Each transmitted copy must be at most 3 MB to stay below the function request limit.
- HEIC and videos are not accepted in this version. Guests can choose a JPG export.
- Uploads are sent one at a time; successfully sent photos are skipped when retrying failures.
- Each photo shows a measured browser-to-website transfer percentage and progress bar. After transfer, “Saving photo…” remains until the backend confirms that Google saved the file. A completed transfer alone is never shown as a successfully received photo.
- Upload IDs and seven-day receipts prevent repeated files if a response is lost, including after you move a photo to another folder.
- The Apps Script allows 300 photos per India-calendar day by default. Change MAX_UPLOADS_PER_DAY in the script if needed, then update its deployment.
- Files are saved only to Misc; the client cannot supply another folder. Server validation checks request size, JPEG signatures, and payload shape. The script independently validates the payload and secret. The website stores no persistent photo copies.
- Hosting requires the existing Vercel functions or the configured local Vite middleware. Static-only hosting cannot process uploads.

## Relevant files

- src/pages/Share.jsx and Share.scss: guest experience.
- src/utils/preparePhoto.js: browser preparation.
- server/upload.js and api/upload.js: validation and server-only connection.
- google-apps-script/GuestUploads.gs: authorized Drive writer.
- tests/upload.test.js: server validation, response handling, and simulated Apps Script writes/deduplication.

Official references: https://developers.google.com/apps-script/guides/web and https://developers.google.com/apps-script/reference/drive/folder
