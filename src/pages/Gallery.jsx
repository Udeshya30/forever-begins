import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { HeroSection, SectionHeading } from '../components';
import './Gallery.scss';
import { useDriveGallery } from '../hooks/useDriveGallery';
import { Photo } from '../components/Photo';
import { Link } from 'react-router-dom';

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
          <Photo key={image.src} src={image.src} alt={image.alt} className="lightbox-image" />
          <p className="lightbox-title">{image.title}</p>
          {image.description && <p className="lightbox-caption">{image.description}</p>}
          {image.driveUrl && <a className="lightbox-source" href={image.driveUrl} target="_blank" rel="noopener noreferrer">Open in Drive</a>}
        </div>
        <button type="button" className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next photo"><ChevronRight /></button>
      </div>
    </dialog>
  );
};

export const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { images: allImages, status, retry } = useDriveGallery();
  const images = selectedCategory === 'all' ? allImages : allImages.filter((image) => image.category === selectedCategory);
  const selectedImageIndex = images.findIndex((image) => image.id === selectedImageId);
  const closeLightbox = () => setSelectedImageId(null);
  return (
    <main className="gallery">
      <HeroSection title="Our Memories" subtitle="From college days to the next chapter" />
      <section className="gallery-section">
        <div className="container">
          <SectionHeading title="The moments we keep" subtitle="Our people, our places, our story" />
          <div className="gallery-share-invite"><p>Have a little memory to share with us?</p><Link to="/share-photos" className="btn btn-secondary">Share your photos ↗</Link></div>
          <div className="gallery-filters" aria-label="Photo categories">
            {[{ id: 'all', displayName: 'All Memories' }, ...galleryData.categories].map((category) => (
              <button type="button" key={category.id} aria-pressed={selectedCategory === category.id}
                className={`gallery-filter ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(category.id); closeLightbox(); }}>
                {category.displayName}
              </button>
            ))}
          </div>
          {status === 'loading' && !allImages.length && <p className="gallery-status" role="status">Opening our photo album…</p>}
          {status === 'error' && <div className="gallery-status" role="status"><p>Our photos couldn’t load just now. Please try again.</p><button type="button" className="btn btn-secondary" onClick={retry}>Try again</button></div>}
          {images.length ? (
            <div className="gallery-grid">
              {images.map((image) => (
                <button type="button" key={image.id} className="gallery-item" onClick={() => setSelectedImageId(image.id)} aria-label={`View ${image.title || image.alt}`}>
                  <Photo key={image.thumbnailSrc} src={image.thumbnailSrc} alt={image.alt} loading="lazy" />
                  <span className="gallery-overlay"><span className="gallery-overlay-text">View photo</span></span>
                </button>
              ))}
            </div>
          ) : status === 'ready' ? (
            <div className="gallery-empty" role="status">
              <span aria-hidden="true">U & B</span>
              <h3>{selectedCategory === 'all' ? 'Our photo album is on its way' : galleryData.categories.find((category) => category.id === selectedCategory)?.displayName}</h3>
              <p>{selectedCategory === 'college' ? 'Our shared beginning in Odisha deserves a page of its own.' : 'We’ll share our own photographs here as this album comes together.'}</p>
            </div>
          ) : null}
        </div>
      </section>
      {selectedImageIndex >= 0 && (
        <Lightbox image={images[selectedImageIndex]} onClose={closeLightbox}
          onNext={() => setSelectedImageId(images[(selectedImageIndex + 1) % images.length].id)}
          onPrev={() => setSelectedImageId(images[(selectedImageIndex - 1 + images.length) % images.length].id)} />
      )}
    </main>
  );
};
export default Gallery;
