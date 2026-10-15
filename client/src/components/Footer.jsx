import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
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
            <div className="footer-badge">
              <ShieldCheck size={18} color="#FF8C00" style={{ flexShrink: 0 }} />
              <span>Dedicated Quality, Site Safety & Supervised Training</span>
            </div>
          </div>

          {/* Construction Services */}
          <div className="footer-col">
            <h4>Construction Division</h4>
            <ul className="footer-links">
              <li><Link to="/services/turnkey">Turnkey Construction</Link></li>
              <li><Link to="/services/residential">Residential Buildings</Link></li>
              <li><Link to="/services/commercial">Commercial Structures</Link></li>
              <li><Link to="/services/interior">Interior Design & Execution</Link></li>
              <li><Link to="/services/exterior">Exterior & Elevation Works</Link></li>
              <li><Link to="/services/estimation-boq">Estimation & Bill of Quantities</Link></li>
              <li><Link to="/portfolio">Project Portfolio</Link></li>
            </ul>
          </div>

          {/* Academy Division */}
          <div className="footer-col">
            <h4>CivilWorld Academy</h4>
            <ul className="footer-links">
              <li><Link to="/academy">Academy Overview</Link></li>
              <li><Link to="/academy/programs">Graduate Training Programs</Link></li>
              <li><Link to="/academy/site-training">Practical Site Engineering</Link></li>
              <li><Link to="/academy/documentation-training">BOQ & DPR Documentation</Link></li>
              <li><Link to="/careers">Internships & Opportunities</Link></li>
              <li><Link to="/blog">Civil Knowledge Center</Link></li>
            </ul>
          </div>

          {/* Contact & Official Inquiries */}
          <div className="footer-col">
            <h4>Company & Inquiries</h4>
            <ul className="footer-links footer-contact-list">
              <li className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <a href="mailto:civilworldtelugu1@gmail.com" className="footer-contact-link">
                  civilworldtelugu1@gmail.com
                </a>
              </li>
              <li className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <a href="tel:7032518399" className="footer-contact-link">
                  +91 7032518399
                </a>
              </li>
            </ul>
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
