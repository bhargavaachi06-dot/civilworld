import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Target, Eye, ShieldCheck, Award, Users, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            About CivilWorld
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1.25rem' }}>
            Building Structures, Developing Engineers
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto', color: '#cbd5e1', fontSize: '1.15rem' }}>
            CivilWorld was founded to solve two of the construction industry's greatest challenges: ensuring uncompromising quality and transparent execution on site, while giving fresh civil engineering graduates the hands-on site competencies required by modern industry.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Company Heritage & Vision</span>
              <h2>Our Unified Purpose</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                CivilWorld operates on a distinct model: we execute real turnkey construction projects while utilizing select active sites as structured training grounds for young engineering talent under the direct guidance of experienced project heads.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Every project we undertake reflects disciplined engineering, thorough Bill of Quantities (BOQ), verified material quality certificates, and adherence to structural safety standards.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Transparent client billing and detailed progress reporting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Uncompromising adherence to site safety regulations (PPE)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Dedicated curriculum for practical site engineering competence</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <Target size={24} color="#d97706" />
                  <h3 style={{ fontSize: '1.25rem' }}>Our Mission</h3>
                </div>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>
                  To deliver premium, durable, and architecturally thoughtful construction projects while cultivating high-standard site engineering talent through hands-on technical mentoring.
                </p>
              </div>

              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                  <Eye size={24} color="#0284c7" />
                  <h3 style={{ fontSize: '1.25rem' }}>Our Vision</h3>
                </div>
                <p style={{ fontSize: '0.95rem', margin: 0 }}>
                  To be recognized as a benchmark construction contractor and practical training institution known for technical integrity, transparent documentation, and skilled workforce development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="section-title">
            <span className="badge-tag">Principles</span>
            <h2>Our Core Engineering Pillars</h2>
          </div>

          <div className="grid-3">
            <div className="card">
              <ShieldCheck size={32} color="#d97706" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Safety & Structural Integrity</h3>
              <p style={{ fontSize: '0.9rem' }}>
                We believe no deadline or cost saving justifies compromising structural integrity or worker and student site safety.
              </p>
            </div>

            <div className="card">
              <Award size={32} color="#0284c7" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Transparent Documentation</h3>
              <p style={{ fontSize: '0.9rem' }}>
                From detailed BOQ to daily measurement sheets, our clients and students gain complete visibility into every cubic meter of concrete and kilogram of steel.
              </p>
            </div>

            <div className="card">
              <Users size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Mentorship & Competence</h3>
              <p style={{ fontSize: '0.9rem' }}>
                We bridge the academic gap by teaching what classrooms cannot: actual site coordination, bar bending schedules, and drawing to ground execution.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
