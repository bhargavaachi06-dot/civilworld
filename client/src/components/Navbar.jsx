import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileConstructionOpen, setMobileConstructionOpen] = useState(false);
  const [mobileAcademyOpen, setMobileAcademyOpen] = useState(false);

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileConstructionOpen(false);
    setMobileAcademyOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          {/* Official Brand Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobile} aria-label="CivilWorld Homepage">
            <img
              src="/assets/civilworld-logo.png"
              alt="CivilWorld — Learn, Build, Grow"
              className="brand-logo-img"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About Us
                </NavLink>
              </li>

              {/* Construction Services Dropdown */}
              <li className="nav-item">
                <div className="nav-link" tabIndex={0} role="button" aria-haspopup="true">
                  Construction Services <ChevronDown size={14} />
                </div>
                <div className="nav-dropdown">
                  <Link to="/services/residential" className="dropdown-link">Residential Construction</Link>
                  <Link to="/services/commercial" className="dropdown-link">Commercial Construction</Link>
                  <Link to="/services/interior" className="dropdown-link">Interior Design</Link>
                  <Link to="/services/exterior" className="dropdown-link">Exterior Design</Link>
                  <Link to="/services/turnkey" className="dropdown-link">Turnkey Projects</Link>
                  <Link to="/services/estimation-boq" className="dropdown-link">Estimation & BOQ</Link>
                  <Link to="/portfolio" className="dropdown-link">Project Portfolio</Link>
                </div>
              </li>

              {/* CivilWorld Academy Dropdown */}
              <li className="nav-item">
                <div className="nav-link" tabIndex={0} role="button" aria-haspopup="true">
                  CivilWorld Academy <ChevronDown size={14} />
                </div>
                <div className="nav-dropdown">
                  <Link to="/academy/programs" className="dropdown-link">Training Programs</Link>
                  <Link to="/academy/site-training" className="dropdown-link">Practical Site Training</Link>
                  <Link to="/academy/documentation-training" className="dropdown-link">Documentation Training</Link>
                  <Link to="/careers" className="dropdown-link">Careers</Link>
                </div>
              </li>

              <li className="nav-item">
                <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Knowledge Center
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Quick Actions (Admin Button Removed from Public Navbar) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/contact" className="btn btn-primary btn-sm">
              Enquire Now
            </Link>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" onClick={closeMobile}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-logo" onClick={closeMobile} aria-label="CivilWorld Homepage">
                <img
                  src="/assets/civilworld-logo.png"
                  alt="CivilWorld — Learn, Build, Grow"
                  style={{ height: '42px', width: 'auto', objectFit: 'contain', borderRadius: '6px' }}
                />
              </Link>
              <button onClick={closeMobile} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0f172a' }}>
                <X size={24} />
              </button>
            </div>

            <Link to="/" className="mobile-nav-link" onClick={closeMobile}>Home</Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMobile}>About Us</Link>

            {/* Construction Services Mobile Accordion */}
            <div style={{ padding: '0.5rem 0' }}>
              <div
                style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a', padding: '0.65rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setMobileConstructionOpen(!mobileConstructionOpen)}
              >
                <span>Construction Services</span>
                <ChevronDown size={16} style={{ transform: mobileConstructionOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </div>
              {mobileConstructionOpen && (
                <div className="mobile-sublinks">
                  <Link to="/services/residential" className="mobile-sublink" onClick={closeMobile}>Residential Construction</Link>
                  <Link to="/services/commercial" className="mobile-sublink" onClick={closeMobile}>Commercial Construction</Link>
                  <Link to="/services/interior" className="mobile-sublink" onClick={closeMobile}>Interior Design</Link>
                  <Link to="/services/exterior" className="mobile-sublink" onClick={closeMobile}>Exterior Design</Link>
                  <Link to="/services/turnkey" className="mobile-sublink" onClick={closeMobile}>Turnkey Projects</Link>
                  <Link to="/services/estimation-boq" className="mobile-sublink" onClick={closeMobile}>Estimation & BOQ</Link>
                  <Link to="/portfolio" className="mobile-sublink" onClick={closeMobile}>Project Portfolio</Link>
                </div>
              )}
            </div>

            {/* CivilWorld Academy Mobile Accordion */}
            <div style={{ padding: '0.5rem 0' }}>
              <div
                style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a', padding: '0.65rem 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setMobileAcademyOpen(!mobileAcademyOpen)}
              >
                <span>CivilWorld Academy</span>
                <ChevronDown size={16} style={{ transform: mobileAcademyOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </div>
              {mobileAcademyOpen && (
                <div className="mobile-sublinks">
                  <Link to="/academy/programs" className="mobile-sublink" onClick={closeMobile}>Training Programs</Link>
                  <Link to="/academy/site-training" className="mobile-sublink" onClick={closeMobile}>Practical Site Training</Link>
                  <Link to="/academy/documentation-training" className="mobile-sublink" onClick={closeMobile}>Documentation Training</Link>
                  <Link to="/careers" className="mobile-sublink" onClick={closeMobile}>Careers</Link>
                </div>
              )}
            </div>

            <Link to="/blog" className="mobile-nav-link" onClick={closeMobile}>Knowledge Center</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMobile}>Contact Us</Link>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMobile}>
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
