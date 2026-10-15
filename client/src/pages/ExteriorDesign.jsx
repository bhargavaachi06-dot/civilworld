import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Sun } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const ExteriorDesign = () => {
  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Exterior & Elevation
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Exterior Design & Facade Execution</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Elevating architectural identities with contemporary facade engineering, aluminum composite panels (ACP), high-pressure laminates (HPL), structural glazing, and weather-resistant external coatings.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '3.5rem' }}>
            <div>
              <span className="badge-tag">Elevation Aesthetics</span>
              <h2>Impressive Curb Appeal & Climate Protection</h2>
              <p style={{ marginBottom: '1.25rem' }}>
                A building's facade is not merely visual styling—it acts as the primary shield against wind, solar heat gain, and monsoon precipitation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>3D front elevation modeling tailored to sun path orientation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Weather-durable ACP, HPL, terracotta tiles, and stone cladding</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Double-glazed unit (DGU) structural glazing for acoustic & thermal insulation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>Balcony glass railings with SS 304/316 grade base shoes</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: '1rem' }}>Facade Engineering Elements</h3>
              <p style={{ fontSize: '0.92rem', marginBottom: '1.25rem' }}>
                We execute external elevation works for residential villas, independent bungalows, and multi-story commercial buildings:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
                <li>• CNC cut decorative metal jali & louvres</li>
                <li>• Exterior textured elastomeric coatings</li>
                <li>• Terrace pergola structures (MS / Wood Composite)</li>
                <li>• Modern automated driveway gate systems</li>
                <li>• Landscape pathway lighting and vertical garden frames</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="exterior-design" title="Enquire About Exterior Facade Works" />
        </div>
      </section>
    </div>
  );
};

export default ExteriorDesign;
