import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export const Blog = () => {
  const articles = [
    {
      id: 1,
      title: 'Top 7 Rebar Checking Mistakes on Slab Castings and How to Avoid Them',
      category: 'Site Engineering',
      readTime: '6 min read',
      date: 'Field Knowledge Series',
      summary: 'Before placing concrete on an RCC roof slab, inspect cover blocks, chair spacing, negative reinforcement crank bars, and electrical conduit bundling to prevent structural sagging and honeycombing.',
    },
    {
      id: 2,
      title: 'Understanding Concrete Slump Tests: When to Reject a Transit Mixer',
      category: 'Quality Control',
      readTime: '5 min read',
      date: 'Quality Assurance',
      summary: 'A comprehensive field guide on true slump, shear slump, and collapse slump. Why adding unmeasured water at the site pump destroys structural design strength.',
    },
    {
      id: 3,
      title: 'The Essential Daily Progress Report (DPR) Structure for Site Engineers',
      category: 'Documentation',
      readTime: '4 min read',
      date: 'Site Administration',
      summary: 'Learn the exact components of an ironclad DPR: labor attendance records, machinery operational hours, material receipts, and weather hindrance tracking for claim protection.',
    },
    {
      id: 4,
      title: 'Turnkey Construction vs Item-Rate Contracts: What Homeowners Must Know',
      category: 'Construction',
      readTime: '7 min read',
      date: 'Cost & Management',
      summary: 'Comparing single-point turnkey execution with fragmented subcontractor hiring. How hidden variance costs can inflate self-managed building budgets by up to 25%.',
    },
    {
      id: 5,
      title: 'Mastering Bar Bending Schedules (BBS) for Combined Footings',
      category: 'Quantity Surveying',
      readTime: '8 min read',
      date: 'Technical Drawing',
      summary: 'Step-by-step breakdown of calculating cut lengths, crank deductions, bend allowances according to IS 2502 standards, and minimizing rebar scrap wastage.',
    },
    {
      id: 6,
      title: 'Waterproofing Sunken Slabs: A Step-by-Step Field Protocol',
      category: 'Finishes & Services',
      readTime: '5 min read',
      date: 'Execution Guide',
      summary: 'Common failure points in bathroom and utility sunken slabs. Why surface coving, polymer membrane coatings, and 48-hour pond testing are mandatory before filling.',
    },
  ];

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag blue" style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
            Knowledge Center
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>CivilWorld Knowledge Center</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Practical field insights, structural quality checklists, quantity surveying formulas, and building execution guides for engineers and project owners.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {articles.map((art) => (
              <div key={art.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>
                    {art.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={12} /> {art.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: '1.35' }}>
                  {art.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>
                  {art.summary}
                </p>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{art.date}</span>
                  <span style={{ color: '#d97706', fontSize: '0.88rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    Read Guide <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
