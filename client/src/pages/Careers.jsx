import React from 'react';
import { Briefcase, CheckCircle2, GraduationCap, Users, ArrowRight } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const Careers = () => {
  const openings = [
    {
      title: 'Junior Site Engineer (Residential & Turnkey)',
      type: 'Full-Time | Site-Based',
      location: 'CivilWorld Active Construction Projects',
      experience: '0 to 2 Years (Freshers with practical training welcome)',
      desc: 'Supervising RCC shuttering and rebar execution, coordinating concrete batching, enforcing site safety protocols, and updating Daily Progress Reports (DPR).',
    },
    {
      title: 'Quantity Surveying & Billing Trainee',
      type: 'Full-Time / Internship',
      location: 'Engineering Head Office',
      experience: 'Entry-Level / Civil Graduates',
      desc: 'Assisting senior quantity surveyors with Bar Bending Schedules (BBS), BOQ rate analysis, Measurement Book entries, and material reconciliation.',
    },
    {
      title: 'Site Safety & Quality Inspector',
      type: 'Full-Time',
      location: 'Commercial Building Projects',
      experience: '1 to 3 Years',
      desc: 'Monitoring worker PPE adherence, conducting slump and cube testing, maintaining site hindrance registers, and inspecting waterproofing applications.',
    },
  ];

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Work With Us
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Careers & Student Opportunities</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Build your professional engineering trajectory with CivilWorld. Explore site engineering roles, trainee internships, and our industry placement network.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="badge-tag">Current Openings</span>
            <h2>Join Our Engineering & Execution Team</h2>
            <p>We are always looking for disciplined, safety-conscious civil engineering professionals.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            {openings.map((job, idx) => (
              <div key={idx} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <span style={{ backgroundColor: '#e2e8f0', padding: '0.3rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    Exp: {job.experience}
                  </span>
                </div>
                <p style={{ fontSize: '0.92rem', marginBottom: '1.25rem' }}>{job.desc}</p>
                <a href="#apply" className="btn btn-outline btn-sm">
                  Apply for this Role <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          {/* Student Placement Pathway Info */}
          <div className="grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
            <div>
              <span className="badge-tag blue">Academy Graduate Pathway</span>
              <h2>Placement Assistance & Network</h2>
              <p style={{ marginBottom: '1rem' }}>
                CivilWorld Academy partners with local construction contractors, structural consultants, and developers seeking site engineers with practical competencies.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Resume preparation focused on verified site skills (BBS, DPR, Rebar Inspection)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Mock technical interviews simulating real site scenario questions</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span>Direct candidate referrals to partner construction firms</span>
                </li>
              </ul>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Placement Policy Notice</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>
                CivilWorld provides comprehensive placement assistance, interview recommendations, and portfolio reviews. However, we do not promise guaranteed jobs, as employment decisions remain subject to candidate interview performance and hiring company criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="general-enquiry" title="Submit Your Job / Internship Application" />
        </div>
      </section>
    </div>
  );
};

export default Careers;
