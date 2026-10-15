import React from 'react';
import { HardHat, ShieldCheck, CheckCircle2, AlertTriangle, Compass, Eye } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const PracticalSiteTraining = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag blue" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
            Field Mentorship
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Practical Site Engineering Exposure</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Live project site exposure under direct senior engineer supervision. Learn how structural drawings transform into concrete reality with absolute adherence to safety and quality standards.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Site Reality</span>
              <h2>Skills You Only Learn in the Field</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Engineering graduates often struggle during their first site postings because textbook diagrams do not capture the complexities of actual execution—such as shuttering gaps, honeycombing, rebar congestion, or unexpected soil variations.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Rebar Inspection:</strong> Checking lap lengths, hook angles, cover block placement, and chair supports before concrete pouring.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Formwork & Shuttering:</strong> Assessing shuttering oil application, prop verticality, bracing stability, and de-shuttering schedules.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Quality Assurance:</strong> Conducting slump cone tests, temperature checks, casting concrete cubes, and overseeing pond curing.</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <ShieldCheck size={28} color="#d97706" />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Site Safety & Protocol Rules</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#475569' }}>
                <li>1. <strong>Mandatory Safety Gear:</strong> Industrial safety helmet, high-visibility vest, and steel-toe safety footwear at all times.</li>
                <li>2. <strong>Supervised Zones:</strong> Students operate strictly in designated non-hazardous inspection zones with their mentors.</li>
                <li>3. <strong>Zero Unsupported Labor:</strong> Students participate as trainee engineers and quality inspectors, never as manual laborers.</li>
                <li>4. <strong>Incident Reporting:</strong> Comprehensive site safety induction on day one, including emergency exits and first-aid kits.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="practical-site-training" title="Apply for Practical Site Training" />
        </div>
      </section>
    </div>
  );
};

export default PracticalSiteTraining;
