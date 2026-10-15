import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import SocialLinks from './SocialLinks.jsx';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 — CivilWorld */}
          <div className="footer-col">
            <h4 className="footer-col-title">CivilWorld</h4>
            <Link to="/" style={{ display: 'inline-block' }} aria-label="CivilWorld Homepage">
              <img
                src="/assets/civilworld-logo.png"
                alt="CivilWorld — Learn, Build, Grow"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-desc">
              CivilWorld integrates professional turnkey construction and engineering execution with practical site-exposure and technical documentation training for civil engineering graduates.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links footer-links-grid">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/academy">Academy</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Knowledge Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3 — Contact Us */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-links footer-contact-list">
              <li className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <a href="tel:7032518399" className="footer-contact-link">
                  +91 7032518399
                </a>
              </li>
              <li className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:civilworldtelugu1@gmail.com" className="footer-contact-link">
                  civilworldtelugu1@gmail.com
                </a>
              </li>
            </ul>

            {/* Social links */}
            <div className="footer-social-section">
              <h4 className="footer-social-title">Follow CivilWorld</h4>
              <SocialLinks theme="footer" iconSize={18} />
            </div>
          </div>
        </div>

        {/* Legal & Standards Disclaimer */}
        <div className="footer-disclaimer">
          <strong>Compliance Notice:</strong> Students participating in CivilWorld Academy undergo supervised practical site exposure adhering strictly to project site-safety regulations. Certificates issued confirm practical training participation and skill assessments; they do not represent government-accredited university degrees, nor do we promise guaranteed employment.
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} CivilWorld Engineering & Academy. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

