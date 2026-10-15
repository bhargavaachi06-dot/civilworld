import React from 'react';
import { FileSpreadsheet, CheckCircle2, Calculator, BarChart3, FileCheck } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const EstimationBOQ = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Quantity Surveying & Cost Control
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Estimation & Bill of Quantities (BOQ)</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Accurate, bank-acceptable, item-wise cost estimates, standard rate analysis, Bar Bending Schedules (BBS), and tender documentation for property owners and developers.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Financial Precision</span>
              <h2>Preventing Cost Overruns Before First Dig</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Uncertain construction budgets stem from vague estimates and missing work items. CivilWorld provides forensic-grade BOQs detailing earthwork, concrete, reinforcement steel, masonry, joinery, finishes, and MEP.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Item-by-item breakdown referenced against standard CPWD/State SSR</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Comprehensive Bar Bending Schedule (BBS) to minimize rebar cutting waste</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Material consumption scheduling for cement, sand, aggregates, and steel</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Bank loan estimation certification by qualified quantity surveyors</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Estimation Deliverables</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <strong>1. Detailed Item-Rate BOQ:</strong> Quantities of excavation, PCC, RCC, brickwork, plaster, flooring, and waterproofing with unit rates.
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <strong>2. Bar Bending Schedule (BBS):</strong> Diameter-wise rebar cut lengths, bending shapes, hook allowances, and total weight in metric tons.
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <strong>3. Rate Analysis Sheets:</strong> Material, labor, machinery, overheads, and contractor profit breakdowns for custom items.
                </div>
                <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <strong>4. Cash Flow & Procurement Plan:</strong> Month-wise capital requirement forecast mapped to building progress.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="estimation-boq" title="Request an Estimation / BOQ Service" />
        </div>
      </section>
    </div>
  );
};

export default EstimationBOQ;
