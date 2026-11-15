# ⚡ Quick Start Guide — Forever Begins

Get your wedding website up and running in 5 minutes!

## Step 1: Install Dependencies (1 minute)

```bash
cd D:\forever-begins
npm install
```

## Step 2: Update Wedding Information (2 minutes)

Edit `src/data/weddingConfig.js` with your couple information:

```javascript
export const weddingConfig = {
  groom: {
    name: 'Your Name',
  },
  bride: {
    name: 'Your Partner\'s Name',
  },
  weddingDate: '2027-02-12', // Your wedding date
  weddingTime: '18:00',
  // ... more configuration
};
```

## Step 3: Start the Dev Server (Instant!)

```bash
npm run dev
```

Opens at `http://localhost:5173`

## Step 4: Explore All Pages

- **Home** `/` — Landing page with countdown
- **Our Story** `/our-story` — Relationship journey
- **Celebration** `/celebration` — Events and FAQ
- **Gallery** `/gallery` — Photo gallery with lightbox
- **Surprise** `/surprise` — Personal love letter

## Step 5: Customize Content

Edit these files to personalize your site:

```
src/data/
  ├── weddingConfig.js     ← Couple names, dates, website info
  ├── storyData.js         ← Your story and memories
  ├── celebrationData.js   ← Wedding events and FAQ
  ├── galleryData.js       ← Wedding photos
  └── surpriseData.js      ← Personal letter and memories
```

## Step 6: Add Your Photos

Replace placeholder image URLs with your own:

```javascript
// In any data file:
image: 'https://your-image-url.jpg'

// Or use local images:
import heroImage from '../assets/images/hero.jpg';
```

## Step 7: Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

## Step 8: Deploy to Vercel (Free!)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Click "Deploy"
5. Share your live website! 🎉

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.**

---

## Key Features ✨

- ✅ **Live countdown timer** to wedding day (updates every second)
- ✅ **Beautiful responsive design** for mobile and desktop
- ✅ **Photo gallery** with lightbox and filtering
- ✅ **Smooth animations** and transitions
- ✅ **Mobile-first** design
- ✅ **Fast production build** (~290KB total)
- ✅ **SEO optimized** for social sharing
- ✅ **100% static** (no backend needed)
- ✅ **Free hosting** on Vercel

## Project Structure

```
src/
  ├── pages/           # 5 main pages (Home, Story, Events, Gallery, Surprise)
  ├── components/      # Reusable components (Navbar, Footer, etc.)
  ├── data/           # All content & configuration
  ├── styles/         # Global design system (colors, fonts, spacing)
  ├── hooks/          # Custom React hooks
  ├── utils/          # Helper functions
  └── App.jsx         # Main app component
```

## Useful Commands

```bash
# Development
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Check code with Oxlint
```

## Colors & Design

**Color Palette:**
- Warm Ivory: `#F8F5EF`
- Champagne: `#E8DCC8`
- Muted Gold: `#B49A72`
- Deep Brown: `#493B35`

**Fonts:**
- Serif (Headings): Playfair Display
- Sans-serif (Body): Lato

**Edit in:** `src/styles/variables.scss`

## Timezone Note

The countdown timer uses **India Standard Time (IST/Asia/Kolkata)**.

Update in `src/data/weddingConfig.js`:
```javascript
timezone: 'Asia/Kolkata', // Your timezone
```

## Mobile Testing

Test responsiveness at different screen sizes:
- **Mobile:** 375px
- **Tablet:** 768px
- **Desktop:** 1200px
- **Large:** 1440px+

All layouts are fully responsive mobile-first.

## Next Steps

1. **Personalize** wedding information in `src/data/`
2. **Add** your own photos
3. **Review** each page locally (`npm run dev`)
4. **Deploy** to Vercel (see DEPLOYMENT.md)
5. **Share** QR code and URL with guests

## Common Updates

### Change wedding date
→ Edit `weddingConfig.js` → `weddingDate`

### Update couple names
→ Edit `weddingConfig.js` → `groom.name` / `bride.name`

### Add story content
→ Edit `src/data/storyData.js`

### Update event details
→ Edit `src/data/celebrationData.js`

### Add gallery photos
→ Edit `src/data/galleryData.js`

### Write personal letter
→ Edit `src/data/surpriseData.js`

## Support

- See **README.md** for comprehensive documentation
- See **DEPLOYMENT.md** for deployment guide
- Check browser console (F12) for any errors
- Verify all image URLs are accessible

## Ready to Begin?

```bash
npm run dev
# Open http://localhost:5173 in your browser
# Start customizing! 🎨
```

**Forever Begins — Two stories. One forever.** 💑

Happy building! 🚀
