import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Layers,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { publicApi } from '../api/client.js';
import EnquiryForm from '../components/EnquiryForm.jsx';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const res = await publicApi.getProjectBySlug(slug);
      if (res.success && res.data) {
        setProject(res.data);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#d97706', borderRadius: '50%', margin: '0 auto 1rem auto', animation: 'spin 1s linear infinite' }}></div>
        <p style={{ color: '#64748b' }}>Loading project portfolio documentation...</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <AlertCircle size={48} color="#d97706" style={{ margin: '0 auto 1rem auto' }} />
        <h2 style={{ marginBottom: '0.5rem' }}>Project Portfolio Not Found</h2>
        <p style={{ color: '#64748b', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
          The project you are looking for does not exist, has been archived, or is currently in private draft status.
        </p>
        <Link to="/portfolio" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Portfolio Directory
        </Link>
      </div>
    );
  }

  const mapCategoryToInterest = (cat) => {
    switch (cat) {
      case 'residential': return 'residential-construction';
      case 'commercial': return 'commercial-construction';
      case 'interiors': return 'interior-design';
      case 'exteriors': return 'exterior-design';
      case 'turnkey': return 'turnkey-projects';
      default: return 'turnkey-projects';
    }
  };

  return (
    <div>
      {/* Breadcrumb Header */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '3.5rem 0 3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            <Link to="/" style={{ color: '#cbd5e1' }}>Home</Link>
            <span>&gt;</span>
            <Link to="/portfolio" style={{ color: '#cbd5e1' }}>Project Portfolio</Link>
            <span>&gt;</span>
            <span style={{ color: '#f59e0b' }}>{project.title}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '4px', backgroundColor: 'rgba(217, 119, 6, 0.25)', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
              {project.category}
            </span>
            <span style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', textTransform: 'capitalize' }}>
              Status: {project.status}
            </span>
          </div>

          <h1 className="page-hero-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '0.85rem' }}>
            {project.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.95rem', color: '#cbd5e1', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} color="#d97706" />
              <span>{project.location}</span>
            </div>
            {project.startDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} color="#d97706" />
                <span>Commenced: {new Date(project.startDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gridTemplateColumns: '1.6fr 1.1fr', gap: '3.5rem', alignItems: 'start' }}>
            {/* Left Column: Cover, Description, Milestones, Gallery */}
            <div>
              {/* Cover Image */}
              {project.coverImage && (
                <div style={{ marginBottom: '2.5rem', borderRadius: '14px', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid #e2e8f0' }}>
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              {/* Description */}
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#0f172a' }}>Project Overview & Scope</h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.75', color: '#334155', whiteSpace: 'pre-line' }}>
                  {project.description}
                </p>
              </div>

              {/* Objectives List */}
              {project.objectives && project.objectives.length > 0 && (
                <div style={{ marginBottom: '2.5rem', backgroundColor: '#f8fafc', padding: '1.75rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>Engineering Specifications & Highlights</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {project.objectives.map((obj, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontSize: '0.92rem', color: '#334155' }}>
                        <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Milestones Progress Timeline */}
              {project.milestones && project.milestones.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#0f172a' }}>Execution Milestones Timeline</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid #e2e8f0', paddingLeft: '1.5rem', marginLeft: '0.75rem' }}>
                    {project.milestones.map((m, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        <div style={{
                          position: 'absolute',
                          left: '-1.85rem',
                          top: '3px',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: m.status === 'completed' ? '#10b981' : m.status === 'in-progress' ? '#d97706' : '#cbd5e1',
                          border: '2px solid #ffffff',
                          boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
                        }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <strong style={{ fontSize: '0.98rem', color: '#0f172a' }}>{m.title}</strong>
                          <span style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            fontWeight: 600,
                            backgroundColor: m.status === 'completed' ? '#ecfdf5' : m.status === 'in-progress' ? '#fef3c7' : '#f1f5f9',
                            color: m.status === 'completed' ? '#047857' : m.status === 'in-progress' ? '#b45309' : '#64748b',
                            textTransform: 'capitalize',
                          }}>
                            {m.status}
                          </span>
                        </div>
                        {m.description && <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>{m.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photo Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1.25rem', color: '#0f172a' }}>Site Progress Gallery</h3>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    {project.gallery.map((img, idx) => (
                      <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                        <img
                          src={img.url}
                          alt={img.caption || `Progress photo ${idx + 1}`}
                          style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                        />
                        {img.caption && (
                          <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#64748b', backgroundColor: '#f8fafc' }}>
                            {img.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Project Sidebar & Consultation Enquiry */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: '#0f172a' }}>Project Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Category:</span>
                    <strong style={{ textTransform: 'capitalize' }}>{project.category}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Location:</span>
                    <strong>{project.location}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                    <span style={{ color: '#64748b' }}>Status:</span>
                    <strong style={{ textTransform: 'capitalize' }}>{project.status}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Accountability:</span>
                    <strong>CivilWorld Execution</strong>
                  </div>
                </div>
              </div>

              {/* Enquiry Card */}
              <EnquiryForm
                defaultInterest={mapCategoryToInterest(project.category)}
                title={`Consult Regarding ${project.title}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
