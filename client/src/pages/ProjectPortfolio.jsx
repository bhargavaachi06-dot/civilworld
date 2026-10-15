import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, ArrowRight, CheckCircle2, Clock, Layers } from 'lucide-react';
import { publicApi } from '../api/client.js';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const ProjectPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublishedProjects();
  }, [activeCategory]);

  const fetchPublishedProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await publicApi.getProjects(activeCategory);
      if (res.success) {
        setProjects(res.data || []);
      }
    } catch (err) {
      setError('Unable to load project portfolio at this moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="section" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '4.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b' }}>
            Engineering Execution
          </span>
          <h1 className="page-hero-title" style={{ marginBottom: '1rem' }}>Construction Project Portfolio</h1>
          <p style={{ maxWidth: '720px', margin: '0 auto', color: '#cbd5e1' }}>
            Explore verified turnkey construction, residential buildings, commercial complexes, and interior design executions managed by CivilWorld.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <button
              className={`btn btn-sm ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('all')}
            >
              All Verticals
            </button>
            <button
              className={`btn btn-sm ${activeCategory === 'turnkey' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('turnkey')}
            >
              Turnkey Projects
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
              className={`btn btn-sm ${activeCategory === 'interiors' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('interiors')}
            >
              Interiors
            </button>
            <button
              className={`btn btn-sm ${activeCategory === 'exteriors' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveCategory('exteriors')}
            >
              Exteriors & Facade
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#d97706', borderRadius: '50%', margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ color: '#64748b' }}>Loading published projects...</p>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : error ? (
            <div className="alert-box warning" style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : projects.length === 0 ? (
            /* Professional Empty State */
            <div className="card" style={{ maxWidth: '640px', margin: '2rem auto', textAlign: 'center', padding: '3.5rem 2rem' }}>
              <Building2 size={44} color="#d97706" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>No Published Projects in this Category</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.75rem' }}>
                Our engineering team is currently compiling documentation and milestone galleries for ongoing and completed projects. Please check back shortly or request a direct consultation for site references.
              </p>
              <Link to="/contact" className="btn btn-primary btn-sm">
                Request Project Consultation
              </Link>
            </div>
          ) : (
            /* Published Projects Grid */
            <div className="grid-3">
              {projects.map((item) => (
                <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  {item.coverImage ? (
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      style={{ height: '190px', width: '100%', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.25rem' }}
                    />
                  ) : (
                    <div style={{ height: '190px', backgroundColor: '#f1f5f9', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#64748b' }}>
                      <Building2 size={38} color="#d97706" />
                      <span style={{ fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600, textTransform: 'capitalize' }}>
                        {item.category} Project
                      </span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d97706', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#475569', textTransform: 'capitalize' }}>
                      {item.status}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.22rem', marginBottom: '0.4rem', color: '#0f172a' }}>
                    {item.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.85rem' }}>
                    <MapPin size={14} color="#d97706" />
                    <span>{item.location}</span>
                  </div>

                  <p style={{ fontSize: '0.88rem', marginBottom: '1.25rem', color: '#64748b', flex: 1, lineHeight: '1.55' }}>
                    {item.description.length > 140 ? `${item.description.substring(0, 140)}...` : item.description}
                  </p>

                  {item.objectives && item.objectives.length > 0 && (
                    <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Scope Highlights:</span>
                      <ul style={{ listStyle: 'none', marginTop: '0.4rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        {item.objectives.slice(0, 2).map((obj, oIdx) => (
                          <li key={oIdx} style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <CheckCircle2 size={13} color="#10b981" /> {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link
                    to={`/portfolio/${item.slug}`}
                    className="btn btn-outline btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between', marginTop: 'auto' }}
                  >
                    <span>View Project Details</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enquiry Call to Action */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <EnquiryForm defaultInterest="turnkey-projects" title="Discuss Your Upcoming Construction Project" />
        </div>
      </section>
    </div>
  );
};

export default ProjectPortfolio;
