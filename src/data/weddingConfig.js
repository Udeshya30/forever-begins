// Wedding Information Configuration
// Update this file with wedding details

export const weddingConfig = {
  // Couple Information
  groom: {
    name: 'Udeshya Kumar',
    nickname: 'Udeshya',
    hometown: 'Ranchi',
  },
  bride: {
    name: 'Bhanu Supriya',
    nickname: 'Bhanu',
    hometown: 'Visakhapatnam',
  },

  // Wedding Date and Time
  weddingDate: '2027-02-12', // Format: YYYY-MM-DD
  weddingTime: '18:00', // Format: HH:MM (24-hour)
  timezone: 'Asia/Kolkata', // Indian Standard Time
  weddingUtcOffset: '+05:30',
  storyIntroduction: 'From Ranchi and Visakhapatnam, our paths crossed at an engineering college in Odisha. Now, we’re beginning our next chapter together.',
  contact: { email: '', instagram: '' },

  // Website Metadata
  website: {
    title: 'Forever Begins — Udeshya & Bhanu',
    description: 'Where waterfalls meet the sea. From Ranchi and Visakhapatnam to a shared beginning in Odisha.',
    url: 'https://foreverbegins.com', // Update with your deployed URL
    ogImage: '/og-image.jpg', // Update with your OG image path
    keywords: ['wedding', 'ceremony', 'celebration', 'Indian wedding'],
  },

  // Invitation Message
  invitation: {
    mainHeading: 'Forever Begins',
    subHeading: 'Where waterfalls meet the sea.',
    message: 'We joyfully invite you to celebrate with us as we begin our forever journey together.',
    cta: 'Explore Our Story',
  },

  // Navigation Links
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Celebration', path: '/celebration' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Share Photos', path: '/share-photos' },
    { label: 'Surprise', path: '/surprise' },
  ],
};

export default weddingConfig;
