import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, Layers, Users } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const CommercialConstruction = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            CivilWorld Commercial
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Commercial Building Construction</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', color: '#cbd5e1' }}>
            High-occupancy retail complexes, corporate office spaces, educational institutions, and healthcare infrastructure constructed for durability, compliance, and operational efficiency.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Commercial Infrastructure</span>
              <h2>Robust Engineering for High Traffic Demands</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Commercial construction requires higher structural load safety factors, stringent fire prevention specifications, complex MEP ducting, and strict adherence to local municipal bylaws.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Heavy-Duty Structural Frameworks:</strong> High-grade Fe550D rebar and M30+ concrete mixes engineered for vibration dampening and sustained loads.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>MEP Coordination:</strong> Seamless integration of electrical shafts, HVAC ducting, plumbing stacks, and emergency egress stairs.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Turnaround Speed:</strong> Critical path method (CPM) scheduling to meet commercial tenant possession commitments.</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Office Parks & IT Spaces</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Column-free flexible floor plates, raised access flooring, and centralized communication infrastructure.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Retail Plazas & Showrooms</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>High-ceiling structural spans, glass curtain wall facades, and customer transit facilities.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Warehousing & Light Industrial</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Pre-engineered steel buildings (PEB), heavy-load concrete flooring (VDF), and loading bay civil works.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="commercial-construction" title="Enquire About Commercial Construction" />
        </div>
      </section>
    </div>
  );
};

export default CommercialConstruction;
