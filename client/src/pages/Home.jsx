import React from 'react';
import { Link } from 'react-router-dom';
import {
  HardHat,
  Building2,
  GraduationCap,
  ShieldCheck,
  Compass,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  Layers,
  Award,
  Users,
} from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const Home = () => {
  return (
    <div>
      {/* 1. CINEMATIC CENTERED HERO SECTION */}
      <section className="home-hero" aria-label="CivilWorld Introduction">
        <div className="home-hero-container">
          {/* A. Brand Heading (Official emblem + metallic silver/chrome title) */}
          <div className="home-hero-brand home-hero-anim-1">
            <img
              src="/assets/civilworld-logo.png"
              alt="CivilWorld Official Emblem"
              className="home-hero-emblem"
            />
            <h1 className="home-hero-title">CIVILWORLD</h1>
          </div>

          {/* B. Brand Tagline */}
          <div className="home-hero-tagline-wrap home-hero-anim-2">
            <span className="home-hero-tagline-line" aria-hidden="true" />
            <p className="home-hero-tagline">LEARN • BUILD • GROW</p>
            <span className="home-hero-tagline-line right" aria-hidden="true" />
          </div>

          {/* C. Inspirational Quote with highlighted phrases */}
          <blockquote className="home-hero-quote home-hero-anim-3">
            “Where <span className="home-hero-quote-highlight">Skills Become Structures</span>, and <span className="home-hero-quote-highlight">Dreams Become Reality</span>.”
          </blockquote>

          {/* D. Supporting Sentence */}
          <p className="home-hero-supporting home-hero-anim-4">
            Learn with purpose. Build with confidence. Grow into the engineer you aspire to be.
          </p>

          {/* E. CTA Buttons */}
          <div className="home-hero-actions home-hero-anim-5">
            <Link to="/services" className="home-hero-btn-primary">
              <Building2 size={18} />
              <span>Explore Construction</span>
            </Link>
            <Link to="/academy" className="home-hero-btn-secondary">
              <GraduationCap size={18} />
              <span>Discover Academy</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW OF CONSTRUCTION SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="badge-tag">Division A</span>
            <h2>Construction & Engineering Services</h2>
            <p>
              From architectural planning to turnkey handover, CivilWorld delivers structured execution backed by certified quantity surveying and professional site supervision.
            </p>
          </div>

          <div className="grid-3">
            <div className="card pillar-card">
              <div className="card-icon">
                <Building2 size={26} />
              </div>
              <h3 className="card-title">Turnkey Construction</h3>
              <p className="card-text">
                Complete design, procurement, structural execution, and finishing handover with single-point accountability and milestone tracking.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/services/turnkey" style={{ color: '#d97706', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="card pillar-card">
              <div className="card-icon">
                <Compass size={26} />
              </div>
              <h3 className="card-title">Residential & Commercial</h3>
              <p className="card-text">
                Custom residential villas, independent apartments, commercial retail outlets, and multi-functional office structures.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/services/residential" style={{ color: '#d97706', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Residential Works <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="card pillar-card">
              <div className="card-icon">
                <FileSpreadsheet size={26} />
              </div>
              <h3 className="card-title">Estimation & BOQ</h3>
              <p className="card-text">
                Accurate Bill of Quantities, rate analysis, cost estimation, and material scheduling that eliminate budget overruns.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/services/estimation-boq" style={{ color: '#d97706', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Explore BOQ Services <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services" className="btn btn-outline">
              View All Construction Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TRAINING & CAREER DEVELOPMENT OVERVIEW */}
      <section className="section" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge-tag blue">Division B</span>
            <h2>CivilWorld Training Academy</h2>
            <p>
              Empowering civil engineering graduates with practical site competencies, drawing interpretation, Daily Progress Reporting, and career guidance.
            </p>
          </div>

          <div className="grid-3">
            <div className="card pillar-card academy">
              <div className="card-icon blue">
                <HardHat size={26} />
              </div>
              <h3 className="card-title">Practical Site Engineering</h3>
              <p className="card-text">
                Supervised exposure on active project sites. Students learn rebar inspection, concrete batch testing, leveling, and site safety management.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/academy/site-training" style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Site Training Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="card pillar-card academy">
              <div className="card-icon blue">
                <ClipboardList size={26} />
              </div>
              <h3 className="card-title">Documentation & BOQ</h3>
              <p className="card-text">
                Mastering Daily Progress Reports (DPR), measurement sheets (M-Books), quality checklists, bar bending schedules (BBS), and tender documentation.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/academy/documentation-training" style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Documentation Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="card pillar-card academy">
              <div className="card-icon blue">
                <Award size={26} />
              </div>
              <h3 className="card-title">Assessment & Certification</h3>
              <p className="card-text">
                Rigorous practical assessments, verifyable training completion certificates, and interview preparation for entry-level site engineer roles.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/academy/programs" style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Training Curriculum <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRACTICAL SITE EXPERIENCE & SAFETY NOTICE */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Safety First Protocol</span>
              <h2>Supervised Real-Site Exposure</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Unlike purely theoretical institutes, CivilWorld Academy students receive guided, structured exposure to real construction sites under senior site engineers.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Site Safety Compliance:</strong> Mandatory Personal Protective Equipment (PPE) protocol, site induction, and hazard awareness.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Drawing to Ground Interpretation:</strong> Reading architectural, structural, and MEP working drawings directly on the slab.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Transparent Guidance:</strong> No false job guarantees; we focus on verifiable engineering competence and career placement assistance.</span>
                </li>
              </ul>
              <Link to="/academy/site-training" className="btn btn-dark">
                Learn About Our Site Protocol
              </Link>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ marginBottom: '1rem', color: '#0f172a' }}>Student Pathway Model</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Drawing & Quantity Surveying Basics</h4>
                    <p style={{ fontSize: '0.88rem', margin: 0 }}>AutoCAD plan interpretation and BOQ calculation foundations.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Site Engineering Field Practice</h4>
                    <p style={{ fontSize: '0.88rem', margin: 0 }}>Column layout, rebar checklists, shuttering inspection, and pour supervision.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Technical Documentation & DPR</h4>
                    <p style={{ fontSize: '0.88rem', margin: 0 }}>Measurement books, daily logs, client billing, and contractor reconciliation.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>4</div>
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Assessment & Placement Guidance</h4>
                    <p style={{ fontSize: '0.88rem', margin: 0 }}>Skill assessment, verified completion certificate, and interview preparation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS SHOWCASE */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge-tag">Portfolio</span>
            <h2>Representative Construction Showcase</h2>
            <p>
              Engineering projects executed with precise material quality control, structural integrity, and architectural refinement.
            </p>
          </div>

          <div className="grid-3">
            <div className="card">
              <div style={{ height: '180px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexDirection: 'column' }}>
                <Building2 size={36} color="#d97706" />
                <span style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>Residential Villa Project</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Greenwood Premium Residence</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                3,400 sq.ft. contemporary turnkey villa featuring RCC framed structure, high-end thermal insulation, and custom interior woodwork.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <span>Type: Residential</span>
                <span>Scope: Turnkey</span>
              </div>
            </div>

            <div className="card">
              <div style={{ height: '180px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexDirection: 'column' }}>
                <Layers size={36} color="#0284c7" />
                <span style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>Commercial Retail Hub</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Horizon Commercial Centre</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Commercial G+3 complex with structural glazing, basement parking, fire suppression infrastructure, and modern retail facade.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <span>Type: Commercial</span>
                <span>Scope: Civil & Facade</span>
              </div>
            </div>

            <div className="card">
              <div style={{ height: '180px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexDirection: 'column' }}>
                <Compass size={36} color="#10b981" />
                <span style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 600 }}>Interior Turnkey Execution</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Urban Corporate Workspace</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                Acoustic partition walls, ergonomic workstations, electrical and MEP routing, and modern architectural lighting design.
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                <span>Type: Interior</span>
                <span>Scope: Fitout & MEP</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/portfolio" className="btn btn-outline">
              Explore Complete Project Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* 6. ENQUIRY CALL TO ACTION */}
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
              Connect With CivilWorld
            </span>
            <h2 style={{ color: '#ffffff', marginBottom: '1rem' }}>
              Start Your Construction Project or Enroll in Academy Training
            </h2>
            <p style={{ color: '#cbd5e1' }}>
              Whether you need a reliable construction contractor for your next building or are an engineering graduate looking for hands-on site exposure, our team is ready.
            </p>
          </div>

          <EnquiryForm title="Request Consultation or Training Details" />
        </div>
      </section>
    </div>
  );
};

export default Home;
