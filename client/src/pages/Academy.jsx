import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  HardHat,
  FileSpreadsheet,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Award,
  Users,
  Compass,
} from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const Academy = () => {
  return (
    <div>
      <section className="hero" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="badge-tag blue" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                CivilWorld Academy
              </span>
              <h1 className="page-hero-title">Bridge the Gap Between Civil Degree and Site Reality</h1>
              <p>
                CivilWorld Academy prepares newly graduated civil engineers for high-responsibility site engineering roles through supervised active site training, structural drawing interpretation, and Daily Progress Reporting (DPR).
              </p>
              <div className="hero-actions">
                <Link to="/academy/programs" className="btn btn-primary btn-lg">
                  Explore Training Programs
                </Link>
                <Link to="/academy/site-training" className="btn btn-outline-white btn-lg">
                  Site Exposure Protocol
                </Link>
              </div>
            </div>

            <div>
              <div className="hero-badge-panel" style={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                    <GraduationCap size={26} />
                  </div>
                  <div>
                    <h3 style={{ color: '#ffffff', fontSize: '1.15rem' }}>Practical Site Mentorship</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Supervised by Senior Project Engineers</p>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  Theoretical knowledge becomes real when you verify rebar spacing on a live slab, conduct slump tests at the transit mixer, and calculate exact concrete consumption.
                </p>

                <div className="hero-stat-row">
                  <div className="stat-item">
                    <h4 style={{ color: '#38bdf8' }}>Real Sites</h4>
                    <p>Live Construction Exposure</p>
                  </div>
                  <div className="stat-item">
                    <h4 style={{ color: '#38bdf8' }}>Verified</h4>
                    <p>Skill Completion Certificates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Core Curriculum Pillars */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="badge-tag blue">Core Pillars</span>
            <h2>What CivilWorld Academy Teaches</h2>
            <p>Every module is designed to eliminate the common mistakes entry-level site engineers face on real projects.</p>
          </div>

          <div className="grid-3">
            <div className="card pillar-card academy">
              <div className="card-icon blue">
                <HardHat size={26} />
              </div>
              <h3 className="card-title">Practical Site Engineering</h3>
              <p className="card-text">
                Column alignment, center-line layout, shuttering inspection, slump testing, concrete compaction, curing verification, and site PPE enforcement.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/academy/site-training" style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Read Site Training Syllabus <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="card pillar-card academy">
              <div className="card-icon blue">
                <Compass size={26} />
              </div>
              <h3 className="card-title">Drawing Interpretation</h3>
              <p className="card-text">
                Translating architectural floor plans, structural column-beam details, MEP sleeve layouts, and levels directly to ground markers without confusion.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/academy/programs" style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Drawing Program Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="card pillar-card academy">
              <div className="card-icon blue">
                <FileSpreadsheet size={26} />
              </div>
              <h3 className="card-title">BOQ, DPR & Billing</h3>
              <p className="card-text">
                Daily Progress Reports (DPR), Measurement Book (M-Book) entries, Bar Bending Schedules (BBS), and basic contractor reconciliation.
              </p>
              <div style={{ marginTop: '1.25rem' }}>
                <Link to="/academy/documentation-training" style={{ color: '#0284c7', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  Documentation Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Compliance Policy Alert */}
      <section className="section" style={{ backgroundColor: '#fffbeb', borderTop: '1px solid #fde68a', borderBottom: '1px solid #fde68a', padding: '3.5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <ShieldAlert size={36} color="#b45309" style={{ flexShrink: 0, marginTop: '4px' }} />
            <div>
              <h3 style={{ color: '#92400e', marginBottom: '0.5rem' }}>Student Safety & Accreditation Transparency Policy</h3>
              <p style={{ color: '#b45309', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                1. <strong>Supervised Safety:</strong> All site exposure occurs under direct senior supervision with mandatory safety helmets, high-visibility vests, and steel-toe safety footwear. Students never engage in hazardous unsupported manual labor.
              </p>
              <p style={{ color: '#b45309', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                2. <strong>Institutional Status:</strong> Certificates issued by CivilWorld Academy verify training hours and practical assessment results; they do not constitute university academic degrees or government-accredited polytechnic licenses.
              </p>
              <p style={{ color: '#b45309', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                3. <strong>Employment Transparency:</strong> We provide active placement assistance, interview coaching, and contractor network introductions; however, CivilWorld never promises guaranteed employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Lead Form */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge-tag blue">Enrollment</span>
            <h2>Apply for the Next Training Batch</h2>
            <p>Fill out the application form with your college graduation details to receive batch schedules and syllabus.</p>
          </div>
          <EnquiryForm defaultInterest="academy-training" title="CivilWorld Academy Enrollment Inquiry" />
        </div>
      </section>
    </div>
  );
};

export default Academy;
