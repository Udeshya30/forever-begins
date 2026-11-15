import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Clock, Calendar, Users } from 'lucide-react';
import { celebrationData } from '../data/celebrationData';
import { HeroSection, SectionHeading } from '../components';
import './Celebration.scss';

const EventCard = ({ event, index }) => {
  return (
    <article className="event-card">
      <header className="event-header">
        <div className="event-ornament" aria-hidden="true">
          <span></span>
          <span className="event-number">{String(index + 1).padStart(2, '0')}</span>
          <span></span>
        </div>
        <p className="event-eyebrow">The celebrations</p>
        <h3 className="event-name">{event.name}</h3>
        <p className="event-description">{event.description}</p>
      </header>

      <div className="event-details">
        <div className="event-detail">
          <Calendar size={20} className="event-detail-icon" />
          <div>
            <p className="event-detail-label">Date</p>
            <p className="event-detail-value">
              {new Date(event.date).toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'UTC',
              })}
            </p>
          </div>
        </div>

        <div className="event-detail">
          <Clock size={20} className="event-detail-icon" />
          <div>
            <p className="event-detail-label">Time</p>
            <p className="event-detail-value">{event.time}</p>
          </div>
        </div>

        <div className="event-detail">
          <MapPin size={20} className="event-detail-icon" />
          <div>
            <p className="event-detail-label">Venue</p>
            <p className="event-detail-value">{event.venue}</p>
            {event.address && <p className="event-detail-address">{event.address}</p>}
          </div>
        </div>

        <div className="event-detail">
          <Users size={20} className="event-detail-icon" />
          <div>
            <p className="event-detail-label">Dress Code</p>
            <p className="event-detail-value">{event.dressCode}</p>
          </div>
        </div>
      </div>

      {event.specialInstructions && (
        <p className="event-instructions">
          <strong>Note:</strong> {event.specialInstructions}
        </p>
      )}

      <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="event-map-link">
        View on Maps <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </article>
  );
};

const FAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className={`faq-question ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {faq.question}
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="faq-answer">{faq.answer}</div>}
    </div>
  );
};

export const Celebration = () => {
  return (
    <main className="celebration">
      {/* Hero */}
      <HeroSection
        title="Our Celebration"
        subtitle="Join us for these special moments"
        imageUrl="https://images.unsplash.com/photo-1519225421-9f45e0e6e3e4?w=1200&h=600&fit=crop"
        overlayDark={true}
      />

      {/* Events Section */}
      <section className="celebration-section">
        <div className="container">
          <SectionHeading
            title="Wedding Events"
            subtitle="A series of celebrations"
          />

          <div className="events-grid">
            {celebrationData.events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="celebration-faq">
        <div className="container">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know"
          />

          <div className="faq-list">
            {celebrationData.faq.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Celebration;
