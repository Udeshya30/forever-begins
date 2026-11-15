# Forever Begins — A Premium Wedding Website

Welcome to the Forever Begins wedding website project! This is a beautiful, fully responsive digital wedding experience for Udeshya Kumar and Bhanu Supriya's wedding on **12 February 2027**.

## 🎯 Project Overview

Forever Begins is a premium, thoughtfully designed wedding website built with modern web technologies. It's intended to be shared with friends, colleagues, and family through a URL and QR code.

### Features

✨ **5 Beautiful Pages:**
- **Home** — Elegant landing page with live countdown timer
- **Our Story** — Editorial-style storytelling with timeline
- **Celebration** — Wedding events information with FAQ
- **Gallery** — Responsive image gallery with lightbox
- **Surprise** — Special personal page with letter and memories

✨ **Premium Experience:**
- Luxury Indian wedding aesthetic
- Smooth animations and transitions
- Fully responsive mobile-first design
- Accessibility-first approach
- Fast production build optimized for Vercel

## 🛠️ Technology Stack

- **React 19** — UI framework
- **Vite** — Build tool and dev server
- **React Router 7** — Client-side routing
- **Bootstrap 5** — Responsive grid and utilities
- **SCSS** — Styling with variables and mixins
- **Lucide React** — Icon library
- **JavaScript (JSX only)** — No TypeScript

### Why These Technologies?

- **Vite** provides instant HMR and lightning-fast builds
- **React Router** enables SPA routing for smooth navigation
- **Bootstrap** provides responsive utilities without requiring Tailwind
- **SCSS** allows for maintainable, modular styling with the design system
- **JavaScript/JSX** keeps the project lightweight and straightforward
- **No backend** — Pure static frontend, easily deployable to Vercel free tier

## 📁 Project Structure

```
forever-begins/
├── src/
│   ├── assets/              # Images and static files
│   ├── components/          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Countdown.jsx
│   │   ├── HeroSection.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── [].scss         # Component styles
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── OurStory.jsx
│   │   ├── Celebration.jsx
│   │   ├── Gallery.jsx
│   │   ├── Surprise.jsx
│   │   └── [].scss        # Page styles
│   ├── data/              # Configuration and content
│   │   ├── weddingConfig.js      # Couple info, navigation
│   │   ├── storyData.js          # Our Story content
│   │   ├── celebrationData.js    # Events and FAQ
│   │   ├── galleryData.js        # Image gallery
│   │   └── surpriseData.js       # Surprise page content
│   ├── hooks/             # Custom React hooks
│   │   ├── useCountdown.js
│   │   └── useScrollToTop.js
│   ├── styles/            # Global SCSS
│   │   ├── variables.scss  # Design system (colors, fonts, spacing)
│   │   └── global.scss     # Base styles and utilities
│   ├── utils/             # Utility functions
│   │   └── helpers.js      # Date, string, image, storage utilities
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── index.html             # HTML template with metadata
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

1. **Clone or download the project:**
   ```bash
   cd forever-begins
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

### Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter (Oxlint)
npm run lint
```

## ✏️ How to Update Wedding Information

All wedding details are centralized in data files in `src/data/`:

### 1. **Wedding Details** — `weddingConfig.js`
```javascript
export const weddingConfig = {
  groom: { name: 'Udeshya Kumar' },
  bride: { name: 'Bhanu Supriya' },
  weddingDate: '2027-02-12',
  // ... more config
};
```

### 2. **Story Content** — `storyData.js`
Add your personal story, memories, and relationship timeline:
```javascript
{
  id: 'our-journey',
  title: 'Our journey together',
  subtitle: 'From the first moment to now',
  content: 'Your story here...',
  timeline: [
    { year: 'Year 1', event: 'How we met', description: '...' }
  ],
  image: 'https://...'
}
```

### 3. **Events & Celebration** — `celebrationData.js`
Update Mehendi, Sangeet, Wedding, and Reception details:
```javascript
{
  id: 'wedding',
  name: 'Wedding Ceremony & Reception',
  date: '2027-02-12',
  time: '18:00',
  venue: 'Venue Name',
  // ... more details
}
```

### 4. **Gallery** — `galleryData.js`
Add your wedding photos:
```javascript
{
  id: 'eng-1',
  src: 'https://example.com/photo.jpg',
  alt: 'Photo description',
  category: 'engagement',
  title: 'Photo title'
}
```

### 5. **Surprise Letter** — `surpriseData.js`
Customize the personal message, memories, and final text:
```javascript
export const surpriseData = {
  letter: {
    greeting: 'My dearest Bhanu,',
    body: 'Your heartfelt message...'
  },
  memories: { /* your memories */ }
};
```

## 🖼️ How to Replace Images

### Placeholder Images

The website uses Unsplash placeholder images initially. Replace them with your own:

1. **Hero Images** — Update URLs in page components (Home.jsx, OurStory.jsx, etc.)
2. **Gallery Images** — Update image URLs in `src/data/galleryData.js`
3. **Story Section Images** — Update URLs in `src/data/storyData.js`

### Using Local Images

1. Place images in `src/assets/images/`
2. Import them in your components:
   ```jsx
   import heroImage from '../assets/images/hero.jpg';
   
   // Use in component
   <img src={heroImage} alt="Hero" />
   ```

### Recommended Image Sizes

- **Hero images:** 1200px × 600px
- **Gallery images:** 600px × 600px (for consistency in masonry)
- **Story section images:** 800px × 600px
- **OG image (social sharing):** 1200px × 630px

## 🎨 Design System

The design system is centralized in `src/styles/variables.scss`:

### Color Palette
```scss
$primary-ivory:     #F8F5EF
$primary-champagne: #E8DCC8
$primary-gold:      #795832
$primary-brown:     #493B35
$primary-blush:     #EAD9D2
$primary-white:     #FFFFFF
```

The deeper gold is used for readable text, links, and buttons against the light
surfaces. Hero images use a dark overlay to keep light text legible.

### Typography
- **Serif Font (Headings):** Playfair Display
- **Sans-serif Font (Body):** Lato

### Spacing Scale
```scss
$spacing-sm:  0.5rem    // 8px
$spacing-md:  1rem      // 16px
$spacing-lg:  1.5rem    // 24px
$spacing-xl:  2rem      // 32px
// ... more
```

### Breakpoints
- **Mobile:** 320px and up
- **Tablet:** 576px and up
- **Desktop:** 768px and up
- **Large:** 992px and up

## 📱 Responsive Design

The website is **mobile-first** and fully responsive:
- ✅ Mobile (320px+)
- ✅ Tablet (576px+)
- ✅ Desktop (768px+)
- ✅ Large screens (992px+)

All components use SCSS mixins for responsive breakpoints:
```scss
@include respond-to('md') {
  // Mobile-first: Tablet and up
}
```

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High color contrast
- Respects `prefers-reduced-motion` setting
- Meaningful alt text on all images

## 🔒 Security & Privacy

- ✅ No backend or database
- ✅ No user authentication required
- ✅ No sensitive data collected
- ✅ No paid APIs required
- ✅ localStorage used only for client preferences (not required)

**Important:** Do not put personal credentials, private details, or sensitive information in frontend code.

## 🌐 SEO & Social Sharing

The website includes:
- Open Graph metadata for social sharing
- Twitter Card support
- Descriptive meta tags
- Canonical URL support (update in index.html)
- Proper semantic HTML for search engines

Update metadata in `index.html` and `src/data/weddingConfig.js`:
```javascript
website: {
  url: 'https://foreverbegins.vercel.app', // Your deployed URL
  ogImage: '/og-image.jpg',
  title: 'Forever Begins — Udeshya & Bhanu'
}
```

## 🎬 Animations

The website features subtle, elegant animations:
- Fade-in on scroll
- Slide-up animations
- Hover effects on buttons and links
- Smooth page transitions
- Respects `prefers-reduced-motion` for accessibility

Animations are CSS-based and performant (GPU-accelerated).

## 📊 Performance

- **Vite optimizations:** Code splitting, lazy loading
- **Image optimization:** lazy-load on gallery items
- **CSS compression:** SCSS minified in production
- **Build size:** ~290KB JavaScript (gzipped: ~90KB), ~25KB CSS (gzipped: ~4.5KB)

## 🚀 Deployment to Vercel

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/forever-begins.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Update Configuration:**
   - Update `weddingConfig.website.url` with your Vercel URL
   - Update canonical URL in `index.html`

### Vercel Configuration (vercel.json)

Create a `vercel.json` file in the root for SPA routing:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_APP_URL": "@app-url"
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Environment Variables

No environment variables are required for basic deployment. The application is fully static.

## 🔄 Continuous Deployment

- **Automatic redeploys** when you push to GitHub
- **Preview deployments** for pull requests
- **Custom domain support** — Add your own domain in Vercel settings

## 🧪 Testing

### Manual Testing Checklist

- [ ] All 5 routes load correctly (`/`, `/our-story`, `/celebration`, `/gallery`, `/surprise`)
- [ ] Countdown updates every second and shows correct date
- [ ] Gallery lightbox opens and closes smoothly
- [ ] Gallery filters work correctly
- [ ] Navigation works on mobile (hamburger menu)
- [ ] All images load without errors
- [ ] No console errors or warnings
- [ ] Mobile layout responsive (test on 320px, 768px, 1200px widths)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All external links work (Maps, social media, etc.)

### Production Build Testing

```bash
npm run build
npm run preview
```

Then visit `http://localhost:4173` and test all pages.

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
- [SCSS Guide](https://sass-lang.com/guide)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Lucide Icons](https://lucide.dev)

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is in use:
```bash
npm run dev -- --port 3000
```

### Build Fails with SCSS Errors

Make sure all SCSS files use `@use '../styles/variables.scss' as *;` instead of `@import`.

### Images Not Loading

- Check file paths are correct
- Ensure images are in the public folder or imported properly
- Use absolute URLs for external images (Unsplash, etc.)

### Git Issues on Windows

If you see line ending warnings:
```bash
git config core.autocrlf true
```

## 📝 License

This project is a personal wedding website. Feel free to use it as a template for your own wedding or personal projects.

## 💬 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the data configuration files
3. Check browser console for errors (F12)
4. Ensure Node.js and npm versions are up to date

## 🎉 Getting Ready for the Big Day

Final checklist before sharing with guests:

- [ ] All couple information is accurate
- [ ] All event details are correct (dates, times, venues)
- [ ] All images are high-quality and properly sized
- [ ] Story content is personalized and meaningful
- [ ] Countdown timer works correctly in Asia/Kolkata timezone
- [ ] All links are functional (Maps, social media, etc.)
- [ ] Mobile design is beautiful and responsive
- [ ] No console errors in browser
- [ ] Production build passes all tests
- [ ] QR code generated and tested
- [ ] Custom domain configured (optional)
- [ ] Share on social media with OG image

---

**Made with ❤️ for Udeshya & Bhanu**

Forever Begins — Two stories. One forever. 💑
