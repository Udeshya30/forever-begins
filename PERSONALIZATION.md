# Your wedding website

The home page and story use the details you shared: Udeshya is from Ranchi, Bhanu is from Visakhapatnam, and you met at engineering college in Odisha when he was in second year and she joined first year.

## Before sharing

- Confirm the wedding date and time in src/data/weddingConfig.js (currently 12 February 2027, 6 PM IST).
- Confirm each event in src/data/celebrationData.js. The inherited schedule is marked provisional. Add real venues, addresses, map links, dress guidance, travel information, accommodation, and a family contact. Set scheduleConfirmed to true only once it is final.
- Add real photos in src/data/galleryData.js. Categories are college, together, family, and wedding. Each photo needs a unique id, src, alt, category, title, and optional description. Local photos can live in public/photos and use /photos/filename.jpg.
- The gallery reads your public shared Drive folders live; no photo import or rebuild is needed when adding pictures. Portrait folders update the Meet sections too. Keep the folder names and public Viewer access described in LIVE_GALLERY.md. Original watercolor artwork remains on the home page and hero backgrounds; its sources and prompts are documented in output/imagegen/README.md.
- Review the suggested letter in src/data/surpriseData.js. It is a draft, not your original words. Memories and the optional video stay hidden until provided. Video url expects a browser-playable video file.
- Surprise remains in navigation and is publicly accessible at /surprise. No privacy control has been added.
- Add actual email and Instagram details to weddingConfig.contact; blank fields render no links.
- Set the actual deployed domain in weddingConfig.website.url and index.html's canonical URL. Make og:image and twitter:image absolute URLs on that domain for sharing services. The new public/og-image.jpg is a 1200 × 630 invitation preview.
- Add the college name, first conversation, relationship milestones, engagement details, family traditions, and preferred languages only when you are ready to share them.

## Checks

Run npm.cmd run build and npm.cmd test on Windows. No backend, RSVP collection, or deployment was added.
