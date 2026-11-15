// Wedding Information Configuration
// Update this file with wedding details

export const weddingConfig = {
  // Couple Information
  groom: {
    name: 'Udeshya Kumar',
    nickname: 'Udeshya',
  },
  bride: {
    name: 'Bhanu Supriya',
    nickname: 'Bhanu',
  },

  // Wedding Date and Time
  weddingDate: '2027-02-12', // Format: YYYY-MM-DD
  weddingTime: '18:00', // Format: HH:MM (24-hour)
  timezone: 'Asia/Kolkata', // Indian Standard Time

  // Website Metadata
  website: {
    title: 'Forever Begins — Udeshya & Bhanu',
    description: 'Join us as we celebrate the beginning of forever. Two stories. One forever.',
    url: 'https://foreverbegins.com', // Update with your deployed URL
    ogImage: '/og-image.jpg', // Update with your OG image path
    keywords: ['wedding', 'ceremony', 'celebration', 'Indian wedding'],
  },

  // Invitation Message
  invitation: {
    mainHeading: 'Forever Begins',
    subHeading: 'Two stories. One forever.',
    message: 'We joyfully invite you to celebrate with us as we begin our forever journey together.',
    cta: 'Explore Our Story',
  },

  // Navigation Links
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Celebration', path: '/celebration' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Surprise', path: '/surprise' },
  ],
};

export default weddingConfig;
