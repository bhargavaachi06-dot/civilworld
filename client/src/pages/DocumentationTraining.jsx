import React from 'react';
import { FileSpreadsheet, CheckCircle2, ClipboardCheck, BookOpen, Layers } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const DocumentationTraining = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag blue" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
            Technical Documentation
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Construction Documentation & BOQ Training</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Master the official paper trail of construction: Daily Progress Reports (DPR), Measurement Books (M-Book), material reconciliation, Bar Bending Schedules (BBS), and client billing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Site Administration</span>
              <h2>Why Documentation Distinguishes Great Engineers</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                On construction projects, if an item of work is not measured, recorded, and certified in writing, it cannot be billed. Many contractors lose significant revenue due to sloppy documentation, unrecorded extra items, and untracked steel wastage.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Daily Progress Reports (DPR):</strong> Tracking weather conditions, skilled/unskilled labor counts, equipment hours, material received, and completed work.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Measurement Book (M-Book) Protocols:</strong> Standard recording formulas for length, breadth, depth, deductions, and abstract preparation.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Material Reconciliation:</strong> Cement consumption versus theoretical mix design, rebar wastage percentages, and brick batch tallies.</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1.25rem' }}>Documentation Competency Modules</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ borderLeft: '3px solid #0284c7', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.2rem' }}>1. Standard DPR & Hindrance Register</h4>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Maintaining flawless chronological logs to defend claims and timelines.</p>
                </div>
                <div style={{ borderLeft: '3px solid #0284c7', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.2rem' }}>2. Bar Bending Schedules (BBS)</h4>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Spreadsheet formulations for cut lengths, lap lengths, and cutting list optimization.</p>
                </div>
                <div style={{ borderLeft: '3px solid #0284c7', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.2rem' }}>3. Quality & Pour Checklists</h4>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Pre-pour, during-pour, and post-pour inspection signoffs with photographic records.</p>
                </div>
                <div style={{ borderLeft: '3px solid #0284c7', paddingLeft: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '0.2rem' }}>4. Sub-Contractor Measurement & Billing</h4>
                  <p style={{ fontSize: '0.88rem', margin: 0 }}>Generating contractor bills, deducting retention money, and handling dispute settlements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="documentation-training" title="Enroll in Documentation Training" />
        </div>
      </section>
    </div>
  );
};

export default DocumentationTraining;
