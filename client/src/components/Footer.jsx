import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, ShieldCheck, Mail, Phone, MapPin, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col">
            <div className="brand-logo" style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
              <div className="brand-icon-box">
                <HardHat size={22} />
              </div>
              <span>CIVIL<span className="accent">WORLD</span></span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.65' }}>
              CivilWorld integrates professional turnkey construction and engineering execution with practical site-exposure and technical documentation training for civil engineering graduates.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} color="#d97706" />
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

          {/* Contact & Administrative */}
          <div className="footer-col">
            <h4>Company & Inquiries</h4>
            <ul className="footer-links" style={{ gap: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '3px', color: '#d97706' }} />
                <span>CivilWorld Engineering Office & Regional Training Centers</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                <Mail size={16} style={{ flexShrink: 0, color: '#d97706' }} />
                <span>info@civilworld.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                <Phone size={16} style={{ flexShrink: 0, color: '#d97706' }} />
                <span>+91 (Contact Desk Placeholder)</span>
              </li>
              <li style={{ marginTop: '0.5rem' }}>
                <Link to="/admin/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Lock size={13} /> Administrator Portal Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Standards Disclaimer */}
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '2rem', fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.5' }}>
          <strong style={{ color: '#cbd5e1' }}>Compliance Notice:</strong> Students participating in CivilWorld Academy undergo supervised practical site exposure adhering strictly to project site-safety regulations. Certificates issued confirm practical training participation and skill assessments; they do not represent government-accredited university degrees, nor do we promise guaranteed employment.
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} CivilWorld Engineering & Academy. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/admin/login">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
