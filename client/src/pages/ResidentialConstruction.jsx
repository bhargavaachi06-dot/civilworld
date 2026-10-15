import React from 'react';
import { Link } from 'react-router-dom';
import { Home, CheckCircle2, Shield, Ruler, Sparkles, Building2 } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const ResidentialConstruction = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            CivilWorld Construction
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Residential Building Construction</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#cbd5e1' }}>
            Bespoke custom homes, contemporary duplex villas, and premium residential apartments crafted with strict structural standards and durable finishes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Living Architecture</span>
              <h2>Building Homes That Endure Generations</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                CivilWorld handles every phase of residential building with meticulous care. We combine advanced RCC structural calculations with high-grade steel, ready-mix concrete batch testing, and multi-tier waterproofing.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Custom Architectural Planning:</strong> Personalized floor layouts respecting spatial ergonomics and ventilation.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Comprehensive Material Testing:</strong> Compressive cube tests for concrete, tensile rebar certifications, and silt content checks for sand.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Full Milestone Tracking:</strong> Weekly photographic and measurement progress reports provided directly to the client.</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Independent Villas & Duplexes</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Tailored luxury villas designed with double-height living areas, private terrace gardens, and energy-efficient building envelopes.
                </p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Residential Apartments & Floors</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Stilt plus multi-story residential buildings with stilt parking, elevator shafts, rainwater harvesting, and fire compliance.
                </p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Structural Renovation & Extensions</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  Safe structural column-beam retrofitting, additional floor constructions, and structural crack rehabilitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="residential-construction" title="Enquire About Residential Construction" />
        </div>
      </section>
    </div>
  );
};

export default ResidentialConstruction;
