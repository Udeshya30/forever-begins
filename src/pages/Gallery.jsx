import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { HeroSection, SectionHeading } from '../components';
import './Gallery.scss';

const Lightbox = ({ image, isOpen, onClose, onNext, onPrev }) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="lightbox-overlay" onClick={handleBackgroundClick}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          <X size={32} />
        </button>

        <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous image">
          <ChevronLeft size={32} />
        </button>

        <div className="lightbox-image-wrapper">
          <img src={image.src} alt={image.alt} className="lightbox-image" />
          {image.title && <p className="lightbox-title">{image.title}</p>}
        </div>

        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredImages =
    selectedCategory === 'all'
      ? galleryData.images
      : galleryData.images.filter((img) => img.category === selectedCategory);

  const selectedImage = filteredImages[selectedImageIndex];

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <main className="gallery">
      {/* Hero */}
      <HeroSection
        title="Our Gallery"
        subtitle="Beautiful moments, captured"
        imageUrl="https://images.unsplash.com/photo-1519225421-9f45e0e6e3e4?w=1200&h=600&fit=crop"
        overlayDark={true}
      />

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="container">
          <SectionHeading title="Photo Gallery" subtitle="A collection of our favorite moments" />

          {/* Category Filter */}
          <div className="gallery-filters">
            <button
              className={`gallery-filter ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedImageIndex(0);
              }}
            >
              All
            </button>
            {galleryData.categories.map((category) => (
              <button
                key={category.id}
                className={`gallery-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedImageIndex(0);
                }}
              >
                {category.displayName}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <div className="gallery-overlay">
                  <p className="gallery-overlay-text">View</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        image={selectedImage}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNextImage}
        onPrev={goToPrevImage}
      />
    </main>
  );
};

export default Gallery;
