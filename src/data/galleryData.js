// Gallery Configuration
// Add your wedding photos here

export const galleryData = {
  categories: [
    {
      id: 'engagement',
      name: 'Engagement',
      displayName: 'Engagement Photoshoot',
    },
    {
      id: 'pre-wedding',
      name: 'Pre-Wedding',
      displayName: 'Pre-Wedding Moments',
    },
    {
      id: 'wedding',
      name: 'Wedding Day',
      displayName: 'The Big Day',
    },
    {
      id: 'candid',
      name: 'Candid',
      displayName: 'Candid Moments',
    },
  ],

  images: [
    // Engagement Photos
    {
      id: 'eng-1',
      src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=600&fit=crop',
      alt: 'Engagement photo 1',
      category: 'engagement',
      title: 'The Engagement',
      description: 'A moment of pure joy',
    },
    {
      id: 'eng-2',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=600&fit=crop',
      alt: 'Engagement photo 2',
      category: 'engagement',
      title: 'Smiles and love',
      description: 'Forever starts now',
    },
    {
      id: 'eng-3',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=700&fit=crop',
      alt: 'Engagement photo 3',
      category: 'engagement',
      title: 'Together',
      description: 'Two hearts, one love',
    },

    // Pre-Wedding Photos
    {
      id: 'pre-1',
      src: 'https://images.unsplash.com/photo-1534719526891-4a79eda9b43c?w=600&h=600&fit=crop',
      alt: 'Pre-wedding photo 1',
      category: 'pre-wedding',
      title: 'Pre-wedding bliss',
      description: 'Countdown to forever',
    },
    {
      id: 'pre-2',
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop',
      alt: 'Pre-wedding photo 2',
      category: 'pre-wedding',
      title: 'Love in the air',
      description: 'Almost there',
    },
    {
      id: 'pre-3',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
      alt: 'Pre-wedding photo 3',
      category: 'pre-wedding',
      title: 'The wait',
      description: 'Every moment counts',
    },

    // Wedding Day Photos
    {
      id: 'wed-1',
      src: 'https://images.unsplash.com/photo-1519225421-9f45e0e6e3e4?w=600&h=600&fit=crop',
      alt: 'Wedding day photo 1',
      category: 'wedding',
      title: 'The ceremony',
      description: 'Our special moment',
    },
    {
      id: 'wed-2',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=700&fit=crop',
      alt: 'Wedding day photo 2',
      category: 'wedding',
      title: 'First dance',
      description: 'Dance of love',
    },
    {
      id: 'wed-3',
      src: 'https://images.unsplash.com/photo-1519225421-9f45e0e6e3e4?w=600&h=800&fit=crop',
      alt: 'Wedding day photo 3',
      category: 'wedding',
      title: 'Celebration',
      description: 'Joy and happiness',
    },

    // Candid Photos
    {
      id: 'can-1',
      src: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=600&fit=crop',
      alt: 'Candid photo 1',
      category: 'candid',
      title: 'Candid moment 1',
      description: 'Unscripted joy',
    },
    {
      id: 'can-2',
      src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=700&fit=crop',
      alt: 'Candid photo 2',
      category: 'candid',
      title: 'Candid moment 2',
      description: 'Real emotions',
    },
    {
      id: 'can-3',
      src: 'https://images.unsplash.com/photo-1534719526891-4a79eda9b43c?w=600&h=800&fit=crop',
      alt: 'Candid photo 3',
      category: 'candid',
      title: 'Candid moment 3',
      description: 'Precious moments',
    },
  ],
};

export default galleryData;
