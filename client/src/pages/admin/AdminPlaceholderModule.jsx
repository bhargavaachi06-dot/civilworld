import React from 'react';
import { Layers, ShieldCheck, ArrowRight, Construction } from 'lucide-react';

export const AdminPlaceholderModule = ({
  title,
  description,
  plannedFeatures = [],
  moduleCategory = 'Core Module',
}) => {
  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', backgroundColor: '#fef3c7', color: '#b45309', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
            Milestone 2 Architecture Shell
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Category: {moduleCategory}</span>
        </div>
        <h2 style={{ fontSize: '1.65rem', color: '#0f172a', marginBottom: '0.4rem' }}>{title}</h2>
        <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0 }}>{description}</p>
      </div>

      <div className="card" style={{ padding: '2rem', borderLeft: '5px solid #d97706', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Construction size={24} color="#d97706" />
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Planned Functional Capabilities</h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
          This module is registered within the CivilWorld Administrative Shell and authenticated via session tokens. Dedicated schema collections and management UI will connect here without source-code alterations.
        </p>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {plannedFeatures.map((feat, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d97706' }}></div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem', fontSize: '0.85rem', color: '#64748b' }}>
        <strong>Data Safety Lock:</strong> No mockup data is committed to <code>civilworld_db</code> for this module during Phase 1 to keep your database pristine.
      </div>
    </div>
  );
};

export default AdminPlaceholderModule;
