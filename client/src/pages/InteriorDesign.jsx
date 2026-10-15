import React from 'react';
import { Sparkles, CheckCircle2, Compass, Layers } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const InteriorDesign = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Aesthetic Execution
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Interior Design & Turnkey Execution</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Transforming spaces into ergonomic, modern environments with 3D visualization, custom modular joinery, architectural lighting, and premium material finishes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Design & Craftsmanship</span>
              <h2>Where Aesthetics Meet Structural Precision</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                Interior fitouts are an integral part of building engineering. Our civil and architectural background ensures electrical loads, plumbing layouts, acoustic insulation, and false ceiling suspensions are planned safely and sustainably.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>3D Realistic Renders and material sample approval boards</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Factory-finished modular kitchens and wardrobes (BWP Marine Ply)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Designer gypsum/POP false ceilings with cove and magnetic track lighting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Italian marble, large-format glazed vitrified tiles, and wooden flooring</span>
                </div>
              </div>
            </div>

            <div className="grid-2" style={{ gap: '1.25rem' }}>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Modular Kitchens</h4>
                <p style={{ fontSize: '0.88rem' }}>Soft-close tandem boxes, acrylic & PU finishes, quartz countertops, and built-in appliance planning.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Living & Bed Lounges</h4>
                <p style={{ fontSize: '0.88rem' }}>Acoustic TV units, fluted paneling, veneer feature walls, and motorized curtain tracks.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Corporate Offices</h4>
                <p style={{ fontSize: '0.88rem' }}>Glass partitions, conference room audio-visual planning, and breakout cafeterias.</p>
              </div>
              <div className="card">
                <h4 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>Luxury Bathrooms</h4>
                <p style={{ fontSize: '0.88rem' }}>Concealed diverters, frameless glass shower cubicles, and vanity marble basins.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="interior-design" title="Enquire About Interior Execution" />
        </div>
      </section>
    </div>
  );
};

export default InteriorDesign;
