// The schedule is provisional. Confirm every event before sharing invitations.
export const celebrationData = {
  scheduleConfirmed: false,
  events: [
    { id: 'mehendi', name: 'Mehendi', date: '2027-02-10', time: '18:00', description: 'A gathering to begin the celebrations.', dressCode: 'To be confirmed' },
    { id: 'sangeet', name: 'Sangeet', date: '2027-02-11', time: '18:00', description: 'An evening to celebrate together.', dressCode: 'To be confirmed' },
    { id: 'wedding', name: 'Wedding Ceremony', date: '2027-02-12', time: '18:00', description: 'The beginning of our next chapter.', dressCode: 'To be confirmed' },
    { id: 'reception', name: 'Reception', date: '2027-02-12', time: '21:00', description: 'A celebration with our loved ones.', dressCode: 'To be confirmed' },
  ].map((event) => ({ ...event, venue: '', address: '', mapsUrl: '' })),
  travel: [
    { title: 'Getting here', text: 'Travelling from Ranchi, Visakhapatnam, or elsewhere? The wedding city, venue, and arrival guidance will be shared once confirmed.' },
    { title: 'Staying nearby', text: 'Accommodation suggestions will follow when the venue is confirmed. Please wait for those details before booking your stay.' },
    { title: 'A helping hand', text: 'A family contact for travel and event questions will be added here. For now, please reach out through your invitation or directly to the couple.' },
  ],
  faq: [
    { question: 'Are the event details final?', answer: 'The schedule shown here is provisional. Confirmed timings, venues, and map links will be shared before the celebrations.' },
    { question: 'What should I wear?', answer: 'Dress guidance for each celebration will be added once the plans are confirmed.' },
    { question: 'Can I bring a guest?', answer: 'Please follow the guest details on your personal invitation. If you are unsure, check with the couple.' },
    { question: 'What about meals and accessibility?', answer: 'Meal options, parking, and venue accessibility details are still being confirmed. Please let the couple know about any dietary or access needs.' },
  ],
};
export default celebrationData;
