import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Clock, CheckCircle2, Award, Calendar, BookOpen } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const TrainingPrograms = () => {
  const programs = [
    {
      title: 'Practical Site Engineering & Quality Control',
      duration: '8 Weeks (Weekend & Full-Time Batches)',
      target: 'Fresh B.E. / B.Tech / Diploma in Civil Engineering',
      desc: 'Hands-on site engineering fundamentals covering center-line layout, column shuttering, rebar spacing checks, concrete slump, cube casting, and daily labor management.',
      modules: [
        'Site Mobilization & Safety Gear (PPE) Protocol',
        'Grid Line Layout & Total Station / Auto Level Verification',
        'RCC Footing, Column & Slab Reinforcement Inspection',
        'Concrete Mix Quality, Slump Testing & Compaction Supervision',
        'Brickwork Alignment, Plumb Line & Mortar Ratio Checks',
        'Waterproofing Verification for Sunken Slabs & Terraces',
      ],
    },
    {
      title: 'Drawing Interpretation & Bar Bending Schedule (BBS)',
      duration: '4 Weeks',
      target: 'Civil Engineering Students & Junior Site Supervisors',
      desc: 'Master structural and architectural working drawings. Learn how to convert 2D AutoCAD blueprints into accurate 3D reinforcement cages and calculate zero-waste rebar cuts.',
      modules: [
        'Architectural vs Structural Drawing Coordination',
        'Column & Footing Schedule Interpretation',
        'Beam Rebar Curtailment, Lapping & Crank Calculations',
        'Two-Way vs One-Way Slab Reinforcement Detailing',
        'Bar Bending Schedule (BBS) Preparation in Excel',
        'Standard Hook & Bend Deductions (IS 2502 Standards)',
      ],
    },
    {
      title: 'Quantity Surveying, BOQ & Daily Documentation (DPR)',
      duration: '6 Weeks',
      target: 'Civil Engineers aiming for Office, Billing & Estimation Roles',
      desc: 'Step into the critical administrative side of construction: calculating earthwork and concrete quantities, item-rate analysis, measurement sheets, and client billing.',
      modules: [
        'Center-Line & Long Wall / Short Wall Quantity Extraction',
        'Bill of Quantities (BOQ) Preparation (CPWD / State SSR)',
        'Daily Progress Report (DPR) Logs & Labor Reports',
        'Measurement Book (M-Book) Entries & Bill Abstracting',
        'Sub-Contractor Billing & Material Reconciliation',
        'Extra Item & Variation Claim Documentation',
      ],
    },
  ];

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag blue" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
            Structured Curriculum
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Graduate Civil Training Programs</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Practical, industry-aligned training programs built specifically for fresh civil engineering graduates to gain immediate site credibility.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {programs.map((prog, idx) => (
              <div key={idx} className="card" style={{ borderLeft: '5px solid #0284c7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.35rem' }}>{prog.title}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.88rem', margin: 0 }}>Target Audience: {prog.target}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600 }}>
                    <Clock size={16} /> {prog.duration}
                  </div>
                </div>

                <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>{prog.desc}</p>

                <h4 style={{ fontSize: '1rem', marginBottom: '0.85rem', color: '#1e293b' }}>Key Learning Modules:</h4>
                <div className="grid-2" style={{ gap: '0.65rem', marginBottom: '1.5rem' }}>
                  {prog.modules.map((mod, mIdx) => (
                    <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                      <CheckCircle2 size={16} color="#0284c7" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
                  <a href="#enroll" className="btn btn-primary btn-sm">
                    Enroll for this Program
                  </a>
                  <Link to="/academy/site-training" className="btn btn-outline btn-sm">
                    View Site Protocol
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section id="enroll" className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge-tag blue">Batch Registration</span>
            <h2>Apply for Program Enrollment</h2>
            <p>Select your program and submit your details to receive upcoming batch dates and syllabus brochures.</p>
          </div>
          <EnquiryForm defaultInterest="academy-training" title="Program Enrollment Form" />
        </div>
      </section>
    </div>
  );
};

export default TrainingPrograms;
