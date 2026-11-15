import { Heart } from 'lucide-react';
import { surpriseData } from '../data/surpriseData';
import { HeroSection, SectionHeading } from '../components';
import './Surprise.scss';

export const Surprise = () => {
  return (
    <main className="surprise">
      {/* Hero */}
      <HeroSection
        title={surpriseData.title}
        subtitle={surpriseData.subtitle}
        imageUrl="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop"
        overlayDark={true}
      />

      {/* Introduction */}
      <section className="surprise-intro">
        <div className="container">
          <div className="intro-content">
            <Heart className="intro-icon" size={48} />
            <h2 className="intro-heading">{surpriseData.introduction.heading}</h2>
            <p className="intro-text">{surpriseData.introduction.text}</p>
          </div>
        </div>
      </section>

      {/* Letter Section */}
      <section className="surprise-letter">
        <div className="container">
          <div className="letter-wrapper">
            <div className="letter-card">
              <div className="letter-header">
                <Heart size={24} className="letter-icon" />
                <p className="letter-greeting">{surpriseData.letter.greeting}</p>
              </div>

              <div className="letter-body">
                {surpriseData.letter.body.split('\n').map((paragraph, index) => (
                  <p key={index} className="letter-paragraph">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              <div className="letter-footer">
                <p className="letter-closing">{surpriseData.letter.closing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memories Section */}
      <section className="surprise-memories">
        <div className="container">
          <SectionHeading
            title={surpriseData.memories.heading}
            subtitle={surpriseData.memories.description}
          />

          <div className="memories-grid">
            {surpriseData.memories.items.map((memory) => (
              <div key={memory.id} className="memory-card">
                <div className="memory-image">
                  <img src={memory.image} alt={memory.memory} loading="lazy" />
                </div>
                <div className="memory-content">
                  <p className="memory-date">{memory.date}</p>
                  <p className="memory-text">{memory.memory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="surprise-video">
        <div className="container">
          <SectionHeading
            title={surpriseData.videoSection.heading}
            subtitle={surpriseData.videoSection.description}
            accent={false}
          />

          <div className="video-placeholder">
            <p className="video-placeholder-text">{surpriseData.videoSection.instruction}</p>
            <p className="video-placeholder-hint">Video URL: {surpriseData.videoSection.placeholder}</p>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="surprise-final">
        <div className="container">
          <div className="final-content">
            <h2 className="final-heading">{surpriseData.finalMessage.heading}</h2>
            <div className="final-text-wrapper">
              {surpriseData.finalMessage.text.split('\n').map((paragraph, index) => (
                <p key={index} className="final-text">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="surprise-cta">
        <div className="container">
          <a href={surpriseData.cta.href} className="btn btn-lg btn-primary">
            {surpriseData.cta.text}
          </a>
        </div>
      </section>
    </main>
  );
};

export default Surprise;
