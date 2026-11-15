import { artwork } from './assets';
// Add personal dates and memories as they become available.
export const storyData = {
  sections: [
    {
      id: 'his-roots', title: 'A beginning among waterfalls',
      anchor: 'udeshya', profileHeading: 'Meet Udeshya',
      profileFacts: [
        { label: 'Full name', value: 'Udeshya Kumar' },
        { label: 'Our paths crossed in', value: 'Engineering college, Odisha' },
        { label: 'His college chapter', value: 'In his second year when Bhanu joined' },
      ],
      subtitle: 'Udeshya · Ranchi, Jharkhand', place: 'His hometown',
      content: 'Udeshya comes from Ranchi, the City of Waterfalls. Its green landscapes and cascading waters inspired one half of the world you see here.',
      image: artwork.ranchi, imageAlt: 'Watercolor landscape inspired by Ranchi’s forested waterfalls',
    },
    {
      id: 'her-roots', title: 'A beginning beside the sea',
      anchor: 'bhanu', profileHeading: 'Meet Bhanu',
      profileFacts: [
        { label: 'Full name', value: 'Bhanu Supriya' },
        { label: 'Our paths crossed in', value: 'Engineering college, Odisha' },
        { label: 'Her college chapter', value: 'Joined her first year when Udeshya was in second year' },
      ],
      subtitle: 'Bhanu · Visakhapatnam, Andhra Pradesh', place: 'Her hometown',
      content: 'Bhanu comes from Visakhapatnam, the City of Destiny. Its coastline inspired the other half: open horizons, green hills, and the sea.',
      image: artwork.vizag, imageAlt: 'Watercolor landscape inspired by Visakhapatnam’s coast and green hills',
    },
    {
      id: 'college', title: 'Our paths crossed in Odisha',
      subtitle: 'An engineering college. A beginning.', place: 'Where we met', motif: 'Odisha',
      content: 'We met at engineering college in Odisha. Udeshya was in his second year when Bhanu joined her first year. This is the place that connects our two hometowns in our story.',
      timeline: [
        { year: 'Second year', event: 'Udeshya', description: 'Already studying at our engineering college in Odisha.' },
        { year: 'First year', event: 'Bhanu', description: 'Joined the same college, where our paths crossed.' },
      ],
    },
    {
      id: 'next-chapter', title: 'A shared horizon',
      subtitle: '12 February 2027', place: 'Our next chapter',
      content: 'The waterfalls and the sea are a little reminder of where we come from. Odisha is where our paths crossed. Now, we are preparing to begin our next chapter, with our loved ones beside us.',
      image: artwork.panorama, imageAlt: 'An imagined watercolor landscape joining a waterfall with the sea',
    },
  ],
};
export default storyData;
