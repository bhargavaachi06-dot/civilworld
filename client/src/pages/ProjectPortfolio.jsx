import React, { useState } from 'react';
import { Building2, Home, Compass, Layers, CheckCircle2 } from 'lucide-react';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const ProjectPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: 'Greenwood Contemporary Villa',
      category: 'residential',
      type: 'Turnkey Residential',
      area: '3,400 sq.ft.',
      status: 'Execution & Interior Stage',
      desc: 'RCC framed structure, double-height living room, custom skylight, and engineered waterproofing systems.',
      specs: ['M25 Grade Ready-Mix Concrete', 'Fe550D TMT Reinforcement', 'BWP Marine Ply Modular Joinery'],
    },
    {
      id: 2,
      title: 'Horizon Corporate Center',
      category: 'commercial',
      type: 'Commercial G+3',
      area: '14,200 sq.ft.',
      status: 'Superstructure Completed',
      desc: 'Retail shopping floors on ground and first levels, with modern IT workspace floors on upper levels and double basement parking.',
      specs: ['Post-Tensioned Slabs', 'DGU Structural Glazing', 'Central HVAC Duct Coordination'],
    },
    {
      id: 3,
      title: 'Aura Minimalist Living Suite',
      category: 'interior',
      type: 'Interior Turnkey Fitout',
      area: '2,100 sq.ft.',
      status: 'Finishing Completed',
      desc: 'Fluted wooden paneling, concealed cove and track illumination, Italian marble flooring, and modular open-plan kitchen.',
      specs: ['Acrylic Matt Cabinets', 'Concealed Multi-Zone AC', 'Automated Mood Lighting'],
    },
    {
      id: 4,
      title: 'Riverside Duplex Residence',
      category: 'residential',
      type: 'Turnkey Residential',
      area: '2,800 sq.ft.',
      status: 'Finishing Stage',
      desc: 'Vastu-aligned 4BHK duplex residence featuring private landscaped courtyard and rainwater harvesting tank.',
      specs: ['Aerated Autoclaved Concrete (AAC) Blocks', 'Solar Water Heating Integration', 'Teak Wood Main Framing'],
    },
    {
      id: 5,
      title: 'Metro Retail Showroom Facade',
      category: 'commercial',
      type: 'Exterior Facade & Civil Works',
      area: '5,600 sq.ft.',
      status: 'Handover Completed',
      desc: 'High-pressure laminate (HPL) facade paired with spider-fitting structural glazing and automated glass sliding entrances.',
      specs: ['Grade 316 Stainless Steel Fixtures', 'Toughened Laminated Glass', 'Anti-Corrosion Primers'],
    },
    {
      id: 6,
      title: 'Summit Executive Offices',
      category: 'interior',
      type: 'Commercial Office Fitout',
      area: '6,800 sq.ft.',
      status: 'Handover Completed',
      desc: 'Ergonomic 80-seat workstation floor with acoustic gypsum partitions, server room UPS integration, and executive conference suites.',
      specs: ['Acoustic Ceiling Baffles', 'Commercial Grade Carpet Tiles', 'Smart Access Control Door Systems'],
    },
  ];

  const filtered = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Engineering Portfolio
          </span>
          <h1 style={{ color: '#ffffff', marginBottom: '1rem' }}>Construction Project Portfolio</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Explore representative construction projects and execution case studies managed by CivilWorld's engineering and site team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('all')}
            >
              All Projects
            </button>
            <button
              className={`btn btn-sm ${activeCategory === 'residential' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('residential')}
            >
              Residential
            </button>
            <button
              className={`btn btn-sm ${activeCategory === 'commercial' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('commercial')}
            >
              Commercial
            </button>
            <button
              className={`btn btn-sm ${activeCategory === 'interior' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('interior')}
            >
              Interior Fitouts
            </button>
          </div>

          <div className="grid-3">
            {filtered.map((item) => (
              <div key={item.id} className="card">
                <div style={{ height: '170px', backgroundColor: '#e2e8f0', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#475569' }}>
                  <Building2 size={38} color="#d97706" />
                  <span style={{ fontSize: '0.82rem', marginTop: '0.5rem', fontWeight: 600 }}>{item.type}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d97706', fontWeight: 700 }}>{item.area}</span>
                  <span style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#475569' }}>{item.status}</span>
                </div>
                <h3 style={{ fontSize: '1.18rem', marginBottom: '0.65rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.88rem', marginBottom: '1rem', color: '#64748b' }}>{item.desc}</p>
                
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Key Engineering Specs:</span>
                  <ul style={{ listStyle: 'none', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {item.specs.map((s, idx) => (
                      <li key={idx} style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckCircle2 size={13} color="#10b981" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm title="Discuss Your Next Project with Our Engineers" />
        </div>
      </section>
    </div>
  );
};

export default ProjectPortfolio;
