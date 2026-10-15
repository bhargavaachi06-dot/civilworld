import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  HardHat,
  Building2,
  GraduationCap,
  ChevronDown,
  Menu,
  X,
  Lock,
  PhoneCall,
  Briefcase,
  FileSpreadsheet,
  Home as HomeIcon,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const closeMobile = () => setMobileMenuOpen(false);

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
          <nav>
            <ul className="nav-links">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>

              {/* Construction Services Dropdown */}
              <li className="nav-item">
                <div className="nav-link">
                  Construction <ChevronDown size={14} />
                </div>
                <div className="nav-dropdown">
                  <Link to="/services" className="dropdown-link">All Services Overview</Link>
                  <Link to="/services/turnkey" className="dropdown-link">Turnkey Projects</Link>
                  <Link to="/services/residential" className="dropdown-link">Residential Construction</Link>
                  <Link to="/services/commercial" className="dropdown-link">Commercial Construction</Link>
                  <Link to="/services/interior" className="dropdown-link">Interior Design & Execution</Link>
                  <Link to="/services/exterior" className="dropdown-link">Exterior Design & Facade</Link>
                  <Link to="/services/estimation-boq" className="dropdown-link">Estimation & BOQ</Link>
                </div>
              </li>

              {/* Academy Dropdown */}
              <li className="nav-item">
                <div className="nav-link">
                  Academy <ChevronDown size={14} />
                </div>
                <div className="nav-dropdown">
                  <Link to="/academy" className="dropdown-link">Academy Overview</Link>
                  <Link to="/academy/programs" className="dropdown-link">Training Programs</Link>
                  <Link to="/academy/site-training" className="dropdown-link">Practical Site Training</Link>
                  <Link to="/academy/documentation-training" className="dropdown-link">Documentation & BOQ Training</Link>
                </div>
              </li>

              <li className="nav-item">
                <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Portfolio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/careers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Careers
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/blog" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Knowledge
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Quick Actions & Admin Access */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="btn btn-outline btn-sm">
                <Lock size={14} /> Dashboard
              </Link>
            ) : (
              <Link to="/admin/login" className="btn btn-outline btn-sm" title="Administrator Access">
                <Lock size={14} /> Admin
              </Link>
            )}

            <Link to="/contact" className="btn btn-primary btn-sm" style={{ display: 'none', md: 'inline-flex' }}>
              Enquire
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
                  style={{ height: '44px', width: 'auto', objectFit: 'contain', borderRadius: '6px' }}
                />
              </Link>
              <button onClick={closeMobile} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            <Link to="/" className="mobile-nav-link" onClick={closeMobile}>Home</Link>
            <Link to="/about" className="mobile-nav-link" onClick={closeMobile}>About CivilWorld</Link>

            <div style={{ padding: '0.5rem 0' }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', padding: '0.5rem 0.5rem 0.25rem 0.5rem' }}>
                Construction Division
              </div>
              <div className="mobile-sublinks">
                <Link to="/services" className="mobile-sublink" onClick={closeMobile}>All Services</Link>
                <Link to="/services/turnkey" className="mobile-sublink" onClick={closeMobile}>Turnkey Projects</Link>
                <Link to="/services/residential" className="mobile-sublink" onClick={closeMobile}>Residential Construction</Link>
                <Link to="/services/commercial" className="mobile-sublink" onClick={closeMobile}>Commercial Construction</Link>
                <Link to="/services/interior" className="mobile-sublink" onClick={closeMobile}>Interior Design</Link>
                <Link to="/services/exterior" className="mobile-sublink" onClick={closeMobile}>Exterior Design</Link>
                <Link to="/services/estimation-boq" className="mobile-sublink" onClick={closeMobile}>Estimation & BOQ</Link>
              </div>
            </div>

            <div style={{ padding: '0.5rem 0' }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', padding: '0.5rem 0.5rem 0.25rem 0.5rem' }}>
                CivilWorld Academy
              </div>
              <div className="mobile-sublinks">
                <Link to="/academy" className="mobile-sublink" onClick={closeMobile}>Academy Overview</Link>
                <Link to="/academy/programs" className="mobile-sublink" onClick={closeMobile}>Training Programs</Link>
                <Link to="/academy/site-training" className="mobile-sublink" onClick={closeMobile}>Practical Site Training</Link>
                <Link to="/academy/documentation-training" className="mobile-sublink" onClick={closeMobile}>Documentation Training</Link>
              </div>
            </div>

            <Link to="/portfolio" className="mobile-nav-link" onClick={closeMobile}>Project Portfolio</Link>
            <Link to="/careers" className="mobile-nav-link" onClick={closeMobile}>Careers & Placements</Link>
            <Link to="/blog" className="mobile-nav-link" onClick={closeMobile}>Knowledge Center</Link>
            <Link to="/contact" className="mobile-nav-link" onClick={closeMobile}>Contact Us</Link>
            <Link to="/admin/login" className="mobile-nav-link" onClick={closeMobile} style={{ color: '#d97706' }}>
              Admin Portal
            </Link>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMobile}>
                Request Project Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
