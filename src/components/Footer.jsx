import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { weddingConfig } from '../data/weddingConfig';
import './Footer.scss';

export const Footer = () => {
  const currentYear = weddingConfig.weddingDate.slice(0, 4);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Forever Begins</h3>
            <p className="footer-subtitle">
              {weddingConfig.groom.name} & {weddingConfig.bride.name}
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul className="footer-links">
              {weddingConfig.navigation.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Our beginning</h4>
            <p>Waterfalls, the sea, and a shared beginning.<br />Our paths crossed in Odisha.</p>
            <ul className="footer-links">
              {weddingConfig.contact.email && <li>
                <a href={`mailto:${weddingConfig.contact.email}`}>Email</a>
              </li>}
              {weddingConfig.contact.instagram && <li>
                <a href={weddingConfig.contact.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>}
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-credit">
            <p>
              Made with <Heart size={16} className="heart-icon" /> by Udeshya & Bhanu
            </p>
          </div>

          <p className="footer-copyright">
            &copy; {currentYear} Forever Begins. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
