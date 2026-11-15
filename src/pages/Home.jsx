import { Link } from 'react-router-dom';
import { weddingConfig } from '../data/weddingConfig';
import { HeroSection, SectionHeading, Countdown } from '../components';
import './Home.scss';

export const Home = () => {
  const heroImage =
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=600&fit=crop';

  return (
    <main className="home">
      {/* Hero Section */}
      <HeroSection
        title={weddingConfig.invitation.mainHeading}
        subtitle={weddingConfig.invitation.subHeading}
        imageUrl={heroImage}
        overlayDark={true}
      >
        <div className="hero-names">
          <p className="hero-names-label">Join us as</p>
          <h2 className="hero-names-text">
            {weddingConfig.groom.name} <span className="hero-names-and">&</span>{' '}
            {weddingConfig.bride.name}
          </h2>
        </div>
      </HeroSection>

      {/* Countdown Section */}
      <section className="home-countdown">
        <div className="container">
          <div className="countdown-wrapper">
            <h2 className="countdown-heading">The Big Day Is Coming</h2>
            <Countdown targetDate={weddingConfig.weddingDate} />
            <p className="countdown-date">
              {new Date(weddingConfig.weddingDate).toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="home-invitation">
        <div className="container">
          <div className="invitation-content">
            <div className="invitation-text">
              <SectionHeading
                title="You Are Invited"
                subtitle="To celebrate love, joy, and new beginnings"
              />
              <p className="invitation-message">
                {weddingConfig.invitation.message}
              </p>
              <p className="invitation-subtext">
                Join us as we celebrate the beginning of our forever journey. Together, let's
                create beautiful memories that will last a lifetime.
              </p>
            </div>

            <div className="invitation-image">
              <img
                src="https://images.unsplash.com/photo-1534719526891-4a79eda9b43c?w=500&h=500&fit=crop"
                alt="Wedding invitation"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Celebrate With Us?</h2>
            <p>Explore our story and learn about our wedding celebration.</p>

            <div className="cta-buttons">
              <Link to="/our-story" className="btn btn-primary">
                Explore Our Story
              </Link>
              <Link to="/celebration" className="btn btn-secondary">
                View Celebration
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
