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
    <section className="story-section">
      <div className="container">
        <div className={`story-grid ${isEven ? 'even' : 'odd'}`}>
          <div className="story-image">
            <img src={section.image} alt={section.title} loading="lazy" />
          </div>

          <div className="story-content">
            <SectionHeading title={section.title} subtitle={section.subtitle} accent={false} />
            <p className="story-text">{section.content}</p>

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
        subtitle="Two hearts, one journey"
        imageUrl="https://images.unsplash.com/photo-1519225421-9f45e0e6e3e4?w=1200&h=600&fit=crop"
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
