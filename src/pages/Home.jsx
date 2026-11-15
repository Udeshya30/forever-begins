import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import { artwork } from '../data/assets';
import { Countdown, SectionHeading } from '../components';
import './Home.scss';

export const Home = () => (
  <main className="home">
    <section className="landscape-hero" aria-labelledby="wedding-title">
      <img className="landscape-hero-art" src={artwork.panorama} alt="" fetchPriority="high" width="1672" height="941" />
      <div className="landscape-hero-wash" aria-hidden="true" />
      <div className="landscape-hero-copy">
        <p className="eyebrow">Two states. One beautiful beginning.</p>
        <h1 id="wedding-title">{weddingConfig.groom.nickname} <span>&</span> {weddingConfig.bride.nickname}</h1>
        <p className="landscape-hero-tagline">Where waterfalls meet the sea.</p>
        <p className="landscape-hero-intro">From Ranchi and Visakhapatnam.<br />Brought together in Odisha. Beginning forever.</p>
        <div className="landscape-hero-actions">
          <Link to="/celebration" className="btn btn-primary">Join our celebration <ArrowUpRight size={16} aria-hidden="true" /></Link>
          <Link to="/our-story" className="hero-story-link">Discover our story <ArrowDown size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <a className="landscape-hero-date" href="#our-worlds"><span>12 February 2027</span><span>Our forever begins <ArrowDown size={14} aria-hidden="true" /></span></a>
    </section>

    <section className="worlds-section" id="our-worlds" aria-labelledby="worlds-title">
      <div className="container">
        <p className="eyebrow">A little of his world. A little of hers.</p>
        <h2 id="worlds-title">Different roots.<br /><em>A shared horizon.</em></h2>
        <p className="worlds-intro">One story begins among the waterfalls. The other, beside the sea.<br />Our paths found each other at engineering college in Odisha.</p>
        <div className="worlds-grid">
          <article className="hometown-card">
            <div className="hometown-art"><img src={artwork.ranchi} alt="Watercolor illustration inspired by Ranchi’s forested waterfalls" loading="lazy" width="1448" height="1086" /><span>01 / His hometown</span></div>
            <div className="hometown-copy"><p className="eyebrow">The City of Waterfalls</p><h3>Ranchi</h3><p>Udeshya’s roots, in the green landscapes of Jharkhand.</p><div className="hometown-card-footer"><span className="hometown-signature">Udeshya Kumar</span><Link to="/our-story#udeshya" className="hometown-profile-link"><span>Meet Udeshya</span><span className="hometown-profile-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></Link></div></div>
          </article>
          <div className="worlds-connection" aria-hidden="true"><span /><Heart size={23} strokeWidth={1} /><span /></div>
          <article className="hometown-card hometown-card-coast">
            <div className="hometown-art"><img src={artwork.vizag} alt="Watercolor illustration inspired by Visakhapatnam’s green hills and coastline" loading="lazy" width="1448" height="1086" /><span>02 / Her hometown</span></div>
            <div className="hometown-copy"><p className="eyebrow">The City of Destiny</p><h3>Visakhapatnam</h3><p>Bhanu’s roots, by the shores of Andhra Pradesh.</p><div className="hometown-card-footer"><span className="hometown-signature">Bhanu Supriya</span><Link to="/our-story#bhanu" className="hometown-profile-link"><span>Meet Bhanu</span><span className="hometown-profile-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></Link></div></div>
          </article>
        </div>
        <p className="artwork-note">Illustrated landscapes inspired by our hometowns.</p>
      </div>
    </section>

    <section className="odisha-chapter" aria-labelledby="odisha-title">
      <div className="container odisha-chapter-grid">
        <div><p className="eyebrow">03 / Where our paths crossed</p><h2 id="odisha-title">And in Odisha,<br /><em>our story began.</em></h2></div>
        <div className="odisha-chapter-copy"><p>We met at engineering college. Udeshya was in his second year when Bhanu joined her first. Two hometowns, the same campus, and the beginning of a shared story.</p><Link to="/our-story">A little more about us <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
      <ol className="journey-thread container" aria-label="The places in our story">
        <li><span>His roots</span><strong>Ranchi</strong></li><li className="journey-meeting"><span>Our meeting</span><strong>Odisha <Heart size={15} aria-hidden="true" /></strong></li><li><span>Her roots</span><strong>Visakhapatnam</strong></li>
      </ol>
    </section>

    <section className="home-countdown">
      <div className="container countdown-wrapper">
        <p className="eyebrow">The next chapter</p>
        <h2>Counting the moments<br /><em>until forever.</em></h2>
        <Countdown targetDate={`${weddingConfig.weddingDate}T${weddingConfig.weddingTime}:00${weddingConfig.weddingUtcOffset}`} />
        <p className="countdown-date">{new Date(weddingConfig.weddingDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: weddingConfig.timezone })}</p>
      </div>
    </section>

    <section className="home-invitation">
      <div className="container invitation-content">
        <div className="invitation-art"><img src={artwork.panorama} alt="An imagined landscape joining a waterfall with the sea" loading="lazy" width="1672" height="941" /></div>
        <div className="invitation-text"><p className="eyebrow">With the people we love</p><SectionHeading title="You are part of our story." subtitle="Come celebrate the beginning of forever." /><p>{weddingConfig.invitation.message}</p><Link to="/celebration" className="btn btn-primary">The celebrations <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </section>
    <section className="home-cta">
      <div className="container"><p className="eyebrow">From two hometowns to one forever</p><h2>There’s so much<br /><em>to look forward to.</em></h2><p>Our story, our memories, and the celebrations ahead.</p><div className="cta-buttons"><Link to="/gallery" className="btn btn-primary">Our memories</Link><Link to="/surprise" className="btn btn-secondary">A note for Bhanu</Link></div></div>
    </section>
  </main>
);
export default Home;
