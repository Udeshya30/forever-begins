import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { HeroSection, SectionHeading } from '../components';
import './Gallery.scss';

const Lightbox = ({ image, onClose, onNext, onPrev }) => {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="lightbox-overlay" aria-label="Photo viewer"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') { event.preventDefault(); onNext(); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); onPrev(); }
      }}>
      <div className="lightbox-content">
        <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close photo viewer"><X size={28} /></button>
        <button type="button" className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous photo"><ChevronLeft /></button>
        <div className="lightbox-image-wrapper">
          <img src={image.src} alt={image.alt} className="lightbox-image" />
          <p className="lightbox-title">{image.title}</p>
          {image.description && <p className="lightbox-caption">{image.description}</p>}
          {image.sourceUrl && <a className="lightbox-source" href={image.sourceUrl} target="_blank" rel="noopener noreferrer">Photo source · Pexels</a>}
        </div>
        <button type="button" className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next photo"><ChevronRight /></button>
      </div>
    </dialog>
  );
};

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const images = selectedCategory === 'all' ? galleryData.images : galleryData.images.filter((image) => image.category === selectedCategory);
  const closeLightbox = () => setSelectedImageIndex(null);
  return (
    <main className="gallery">
      <HeroSection title="Our Memories" subtitle="From college days to the next chapter" />
      <section className="gallery-section">
        <div className="container">
          <SectionHeading title="The moments we keep" subtitle="Our people, our places, our story" />
          {galleryData.images.some((image) => image.isPlaceholder) && <p className="gallery-placeholder-note">A little inspiration for now. These sample photos will make way for our own memories.</p>}
          <div className="gallery-filters" aria-label="Photo categories">
            {[{ id: 'all', displayName: 'All Memories' }, ...galleryData.categories].map((category) => (
              <button type="button" key={category.id} aria-pressed={selectedCategory === category.id}
                className={`gallery-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(category.id); closeLightbox(); }}>
                {category.displayName}
              </button>
            ))}
          </div>
          {images.length ? (
            <div className="gallery-grid">
              {images.map((image, index) => (
                <button type="button" key={image.id} className="gallery-item" onClick={() => setSelectedImageIndex(index)} aria-label={`View ${image.title || image.alt}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  {image.isPlaceholder && <span className="gallery-placeholder-badge">Sample photo</span>}
                  <span className="gallery-overlay"><span className="gallery-overlay-text">View memory</span></span>
                </button>
              ))}
            </div>
          ) : (
            <div className="gallery-empty" role="status">
              <span aria-hidden="true">U & B</span>
              <h3>{selectedCategory === 'all' ? 'Our photo album is on its way' : galleryData.categories.find((category) => category.id === selectedCategory)?.displayName}</h3>
              <p>{selectedCategory === 'college' ? 'Our shared beginning in Odisha deserves a page of its own.' : 'We’ll share our own photographs here as this album comes together.'}</p>
            </div>
          )}
        </div>
      </section>
      {selectedImageIndex !== null && images[selectedImageIndex] && (
        <Lightbox image={images[selectedImageIndex]} onClose={closeLightbox}
          onNext={() => setSelectedImageIndex((index) => (index + 1) % images.length)}
          onPrev={() => setSelectedImageIndex((index) => (index - 1 + images.length) % images.length)} />
      )}
    </main>
  );
};
export default Gallery;
