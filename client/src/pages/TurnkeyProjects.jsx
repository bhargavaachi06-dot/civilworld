import React from 'react';
import { Building2, CheckCircle2, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const TurnkeyProjects = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Complete Accountability
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Complete Turnkey Construction</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            From raw land to key in hand. We assume single-point responsibility for architectural design, approvals, material procurement, structural execution, interior fitouts, and formal project handover.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Zero Hassle Contract</span>
              <h2>Why Choose Turnkey with CivilWorld?</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Managing multiple independent contractors—architects, structural consultants, masonry contractors, electricians, plumbers, painters, and carpenters—often results in miscommunication, budget overruns, and timeline slips.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                With CivilWorld Turnkey, you have one dedicated project manager, one binding contract, guaranteed item rates, and weekly verified progress milestones.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Transparent BOQ with zero hidden surcharges</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Single-point project manager overseeing quality and timeline</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Comprehensive defect liability period following handover</span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ marginBottom: '1.25rem' }}>Turnkey Execution Roadmap</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#d97706' }}>Phase 1</div>
                  <div><strong>Design & Approvals:</strong> Soil testing, architectural layouts, structural design, and sanction drawing support.</div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#d97706' }}>Phase 2</div>
                  <div><strong>Substructure & Superstructure:</strong> Excavation, anti-termite treatment, footings, plinth, columns, and RCC slab casting.</div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#d97706' }}>Phase 3</div>
                  <div><strong>Finishing & MEP:</strong> Brick masonry, internal/external plaster, plumbing & electrical conduit routing, flooring, and waterproofing.</div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ fontWeight: 700, color: '#d97706' }}>Phase 4</div>
                  <div><strong>Interiors & Handover:</strong> Paint, joinery, sanitary fixtures, deep cleaning, and formal handover with as-built documentation.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="turnkey-projects" title="Request a Turnkey Construction Consultation" />
        </div>
      </section>
    </div>
  );
};

export default TurnkeyProjects;
