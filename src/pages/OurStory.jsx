import { storyData } from '../data/storyData';
import { SectionHeading, HeroSection } from '../components';
import './OurStory.scss';

const StoryTimeline = ({ section }) => {
  if (!section.timeline) return null;

  return (
    <div className="story-timeline">
      {section.timeline.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h4 className="timeline-year">{item.year}</h4>
            <h5 className="timeline-event">{item.event}</h5>
            <p className="timeline-description">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const StorySection = ({ section }) => {
  const isEven = storyData.sections.indexOf(section) % 2 === 0;

  return (
    <section id={section.anchor || section.id} className="story-section" tabIndex={-1} aria-label={section.profileHeading || section.title}>
      <div className="container">
        <div className={`story-grid ${isEven ? 'even' : 'odd'}`}>
          <div className="story-image">
            {section.image ? <figure className="story-landscape">
              <img src={section.image} alt={section.imageAlt} loading="lazy" width="1448" height="1086" />
              <figcaption>{section.place} · An illustrated landscape</figcaption>
            </figure> : <div className="story-place-card">
              <span className="story-place-label">{section.place}</span>
              <p>{section.motif}</p>
              <span aria-hidden="true">U & B</span>
            </div>}
          </div>

          <div className="story-content">
            {section.profileHeading && <p className="story-profile-heading">{section.profileHeading}</p>}
            <SectionHeading title={section.title} subtitle={section.subtitle} accent={false} />
            <p className="story-text">{section.content}</p>
            {section.profileFacts && <dl className="story-profile-facts">
              {section.profileFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
            </dl>}

            {section.timeline && <StoryTimeline section={section} />}

            {section.event && (
              <div className="story-event">
                <p className="story-event-text">{section.event}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const OurStory = () => {
  return (
    <main className="our-story">
      {/* Hero */}
      <HeroSection
        title="Our Story"
        subtitle="Waterfalls, the sea, and a meeting in Odisha"
        overlayDark={true}
      />

      {/* Story Sections */}
      <div className="story-content-wrapper">
        {storyData.sections.map((section) => (
          <StorySection key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
};

export default OurStory;
