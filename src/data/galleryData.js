// Replace each sample with your own photo, set isPlaceholder: false, and remove sourceUrl.
// Local samples and original photo-page credits: public/gallery-placeholders/SOURCES.md.
const sample = (id, category, title, alt, sourceUrl) => ({
  id, category, title, alt, sourceUrl,
  src: `/gallery-placeholders/${id}.jpg`,
  isPlaceholder: true,
  description: 'Sample photograph for inspiration. This will be replaced with our own memories.',
});

export const galleryData = {
  categories: [
    { id: 'college', displayName: 'College Days' },
    { id: 'together', displayName: 'Together' },
    { id: 'family', displayName: 'With Our Families' },
    { id: 'wedding', displayName: 'Wedding Celebrations' },
  ],
  images: [
    sample('college-campus', 'college', 'Campus inspiration', 'Sample photo of a historic campus building', 'https://www.pexels.com/photo/historic-red-brick-building-on-a-campus-38797888/'),
    sample('college-lakeside', 'college', 'A place to begin', 'Sample photo of a university building beside a lake', 'https://www.pexels.com/photo/modern-university-building-by-lakeside-31085766/'),
    sample('together-beach', 'together', 'By the sea', 'Sample photo of a wedding couple at the beach', 'https://www.pexels.com/photo/photograph-of-a-couple-kissing-at-the-beach-13924614/'),
    sample('together-flowers', 'together', 'Little details', 'Sample photo of a pastel floral arrangement', 'https://www.pexels.com/photo/bunch-of-delicate-flowers-on-table-on-wedding-day-6479597/'),
    sample('family-gathering', 'family', 'Gather around', 'Sample photo of a wedding table centerpiece with flowers', 'https://www.pexels.com/photo/elegant-wedding-table-centerpiece-with-flowers-35279295/'),
    sample('family-table', 'family', 'A place for everyone', 'Sample photo of a table setting with pink flowers', 'https://www.pexels.com/photo/setting-place-on-wedding-table-16933504/'),
    sample('wedding-reception', 'wedding', 'Celebration inspiration', 'Sample photo of white flowers at a wedding reception', 'https://www.pexels.com/photo/flower-arrangements-standing-on-a-table-at-a-wedding-reception-19408255/'),
    sample('wedding-details', 'wedding', 'Flowers for the occasion', 'Sample photo of flowers on a wedding table', 'https://www.pexels.com/photo/flowers-on-wedding-table-19894373/'),
  ],
};
export default galleryData;
