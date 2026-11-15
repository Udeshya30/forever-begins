import { Heart } from 'lucide-react';
import { weddingConfig } from '../data/weddingConfig';
import './Footer.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

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
                  <a href={item.path}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul className="footer-links">
              <li>
                <a href={`mailto:contact@example.com`}>Email</a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
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
