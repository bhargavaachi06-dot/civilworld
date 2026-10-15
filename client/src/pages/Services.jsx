import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Home,
  Compass,
  FileSpreadsheet,
  CheckCircle2,
  Layers,
  ArrowRight,
  Shield,
  Ruler,
  Hammer,
} from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const Services = () => {
  const servicesList = [
    {
      title: 'Turnkey Construction Projects',
      slug: '/services/turnkey',
      desc: 'Complete end-to-end management from concept, plan approvals, and soil testing through foundation, superstructure, MEP, and final handover.',
      features: ['Single-point accountability', 'Milestone-based billing', 'Quality audits at every stage', 'Handover with as-built drawings'],
    },
    {
      title: 'Residential Building Construction',
      slug: '/services/residential',
      desc: 'Independent villas, luxury duplexes, row houses, and residential apartments constructed with superior materials and vastu-conscious layouts.',
      features: ['RCC frame structural design', 'Premium brickwork & plastering', 'Custom floor plans', 'Waterproofing warranties'],
    },
    {
      title: 'Commercial Building Construction',
      slug: '/services/commercial',
      desc: 'High-strength commercial complexes, corporate offices, retail showrooms, and institutional structures built to withstand heavy daily occupancy.',
      features: ['Heavy structural steel & RCC', 'Advanced fire safety integration', 'Efficient MEP planning', 'Commercial code compliance'],
    },
    {
      title: 'Interior Design & Execution',
      slug: '/services/interior',
      desc: 'Modern interior space planning, turnkey carpentry, modular kitchens, false ceilings, lighting design, and premium paint finishes.',
      features: ['3D architectural visualization', 'Bespoke modular joinery', 'Acoustic treatment', 'High-end sanitary & electrical fitouts'],
    },
    {
      title: 'Exterior Design & Elevation',
      slug: '/services/exterior',
      desc: 'Striking contemporary facades, exterior ACP/HPL cladding, texture treatments, landscape integration, and weatherproofing.',
      features: ['Thermal facade optimization', 'Glass & louvre systems', 'Compound wall & gate design', 'Exterior weather resistance'],
    },
    {
      title: 'Estimation & Bill of Quantities (BOQ)',
      slug: '/services/estimation-boq',
      desc: 'Independent, highly detailed BOQ preparation, item-rate analysis, material consumption forecasting, and contractor tender validation.',
      features: ['Standard Schedule of Rates (SSR)', 'Bar Bending Schedules (BBS)', 'Pre-bid cost estimation', 'Variance monitoring'],
    },
  ];

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 className="page-hero-title" style={{ marginBottom: '1.25rem' }}>
            Civil Engineering & Construction Services
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto', color: '#cbd5e1', fontSize: '1.15rem' }}>
            Delivering precision-engineered residential, commercial, and turnkey architectural spaces with transparent costing, dedicated site supervision, and milestone-based reporting.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2">
            {servicesList.map((svc, idx) => (
              <div key={idx} className="card">
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.35rem' }}>{svc.title}</h3>
                <p style={{ marginBottom: '1.25rem', fontSize: '0.95rem' }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {svc.features.map((feat, fIdx) => (
                    <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#475569' }}>
                      <CheckCircle2 size={16} color="#d97706" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <Link to={svc.slug} className="btn btn-outline btn-sm">
                  Service Details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Lead Form */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge-tag">Get Started</span>
            <h2>Request a Construction Proposal</h2>
            <p>Share your plot size, building specifications, or project requirements for a detailed consultation.</p>
          </div>
          <EnquiryForm defaultInterest="turnkey-projects" title="Construction Consultation Form" />
        </div>
      </section>
    </div>
  );
};

export default Services;
