import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/client.js';
import {
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Eye,
  Trash2,
  Edit,
  Upload,
  ExternalLink,
  X,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Layers,
} from 'lucide-react';

export const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [publicationStatus, setPublicationStatus] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const initialForm = {
    title: '',
    slug: '',
    category: 'turnkey',
    description: '',
    location: '',
    objectivesText: '',
    status: 'planned',
    publicationStatus: 'draft',
    coverImage: '',
    startDate: '',
    completionDate: '',
    milestones: [],
    gallery: [],
  };

  const [formData, setFormData] = useState(initialForm);

  // Milestone input draft inside form
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    date: '',
    status: 'pending',
  });

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.getProjects({
        search,
        category,
        status,
        publicationStatus,
      });
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [category, status, publicationStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProjects();
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (p) => {
    setIsEditing(true);
    setCurrentId(p._id);
    setFormData({
      title: p.title || '',
      slug: p.slug || '',
      category: p.category || 'turnkey',
      description: p.description || '',
      location: p.location || '',
      objectivesText: Array.isArray(p.objectives) ? p.objectives.join('\n') : '',
      status: p.status || 'planned',
      publicationStatus: p.publicationStatus || 'draft',
      coverImage: p.coverImage || '',
      startDate: p.startDate ? p.startDate.split('T')[0] : '',
      completionDate: p.completionDate ? p.completionDate.split('T')[0] : '',
      milestones: p.milestones || [],
      gallery: p.gallery || [],
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e, isGallery = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Only JPEG, PNG, or WebP images are allowed.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    const uploadPayload = new FormData();
    uploadPayload.append('image', file);

    setUploadingImage(true);
    try {
      const res = await adminApi.uploadProjectImage(uploadPayload);
      if (res.success && res.imageUrl) {
        if (isGallery) {
          setFormData({
            ...formData,
            gallery: [...formData.gallery, { url: res.imageUrl, caption: file.name, order: formData.gallery.length }],
          });
        } else {
          setFormData({
            ...formData,
            coverImage: res.imageUrl,
          });
        }
      }
    } catch (err) {
      alert(err.message || 'Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const addMilestone = () => {
    if (!newMilestone.title.trim()) {
      alert('Milestone title is required.');
      return;
    }
    setFormData({
      ...formData,
      milestones: [...formData.milestones, { ...newMilestone, date: newMilestone.date ? new Date(newMilestone.date) : null }],
    });
    setNewMilestone({ title: '', description: '', date: '', status: 'pending' });
  };

  const removeMilestone = (idx) => {
    setFormData({
      ...formData,
      milestones: formData.milestones.filter((_, i) => i !== idx),
    });
  };

  const removeGalleryImage = (idx) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_, i) => i !== idx),
    });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      category: formData.category,
      description: formData.description,
      location: formData.location,
      status: formData.status,
      publicationStatus: formData.publicationStatus,
      coverImage: formData.coverImage,
      objectives: formData.objectivesText
        ? formData.objectivesText.split('\n').map((s) => s.trim()).filter(Boolean)
        : [],
      startDate: formData.startDate || null,
      completionDate: formData.completionDate || null,
      milestones: formData.milestones,
      gallery: formData.gallery,
    };

    try {
      if (isEditing) {
        await adminApi.updateProject(currentId, payload);
      } else {
        await adminApi.createProject(payload);
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      alert(err.message || 'Failed to save project.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await adminApi.publishProject(id, nextStatus);
      setProjects(projects.map((p) => (p._id === id ? { ...p, publicationStatus: nextStatus } : p)));
    } catch (err) {
      alert(err.message || 'Status update failed.');
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm('Are you sure you want to archive this project? It will be un-published immediately.')) return;
    try {
      await adminApi.archiveProject(id);
      loadProjects();
    } catch (err) {
      alert(err.message || 'Archive failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project permanently? This action is recorded in audit logs.')) return;
    try {
      await adminApi.deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  return (
    <div>
      {/* Module Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.75rem', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 700 }}>
              Milestone 2 &bull; Active Module
            </span>
          </div>
          <h2 style={{ fontSize: '1.65rem', color: '#0f172a', margin: '0.35rem 0' }}>Construction Projects Manager</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Author, curate, publish, and track milestones for residential, commercial, interior, and turnkey construction works.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={loadProjects} className="btn btn-outline btn-sm">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={openCreateModal} className="btn btn-primary btn-sm">
            <Plus size={16} /> New Construction Project
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Search Title / City</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="e.g. Greenwood or Bengaluru..."
                className="form-input"
                style={{ paddingLeft: '2.2rem', fontSize: '0.88rem' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Category</label>
            <select className="form-select" style={{ fontSize: '0.88rem' }} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="turnkey">Turnkey</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="interiors">Interiors</option>
              <option value="exteriors">Exteriors</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Project Status</label>
            <select className="form-select" style={{ fontSize: '0.88rem' }} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ fontSize: '0.8rem' }}>Visibility</label>
            <select className="form-select" style={{ fontSize: '0.88rem' }} value={publicationStatus} onChange={(e) => setPublicationStatus(e.target.value)}>
              <option value="all">All Visibility</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <button type="submit" className="btn btn-dark btn-sm" style={{ height: '42px' }}>
            Filter Projects
          </button>
        </form>
      </div>

      {/* Projects Table */}
      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Project Title & Slug</th>
              <th>Category</th>
              <th>Location</th>
              <th>Execution Status</th>
              <th>Visibility</th>
              <th>Milestones</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem' }}>
                  Loading construction projects...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3.5rem', color: '#94a3b8' }}>
                  <Building2 size={36} style={{ margin: '0 auto 0.75rem auto', display: 'block', opacity: 0.5 }} />
                  <strong>No construction projects recorded yet.</strong>
                  <p style={{ margin: '0.25rem 0 1rem 0', fontSize: '0.88rem' }}>Create your first project draft to publish to the public portfolio.</p>
                  <button onClick={openCreateModal} className="btn btn-primary btn-sm">
                    <Plus size={14} /> Add Project
                  </button>
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.title}</div>
                    <code style={{ fontSize: '0.78rem', color: '#64748b' }}>/{p.slug}</code>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.55rem', borderRadius: '4px', backgroundColor: '#f1f5f9', fontWeight: 600, textTransform: 'capitalize' }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.88rem', color: '#475569' }}>
                    <MapPin size={13} style={{ display: 'inline', marginRight: '3px', color: '#d97706' }} />
                    {p.location}
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px',
                      fontWeight: 600,
                      backgroundColor: p.status === 'completed' ? '#ecfdf5' : p.status === 'ongoing' ? '#e0f2fe' : p.status === 'archived' ? '#f1f5f9' : '#fffbeb',
                      color: p.status === 'completed' ? '#047857' : p.status === 'ongoing' ? '#0284c7' : p.status === 'archived' ? '#64748b' : '#b45309',
                      textTransform: 'capitalize',
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleTogglePublish(p._id, p.publicationStatus)}
                      style={{
                        background: 'none',
                        border: '1px solid',
                        borderRadius: '4px',
                        padding: '0.2rem 0.55rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        borderColor: p.publicationStatus === 'published' ? '#10b981' : '#cbd5e1',
                        color: p.publicationStatus === 'published' ? '#047857' : '#64748b',
                        backgroundColor: p.publicationStatus === 'published' ? '#ecfdf5' : '#f8fafc',
                      }}
                      title="Click to toggle publication"
                    >
                      {p.publicationStatus === 'published' ? 'PUBLISHED' : 'DRAFT'}
                    </button>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {p.milestones?.length || 0} milestone(s)
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {p.publicationStatus === 'published' && (
                        <a
                          href={`/portfolio/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview public page"
                          style={{ color: '#0284c7', padding: '0.3rem' }}
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <button
                        onClick={() => openEditModal(p)}
                        title="Edit project"
                        style={{ background: 'none', border: 'none', color: '#d97706', cursor: 'pointer', padding: '0.3rem' }}
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleArchive(p._id)}
                        title="Archive project"
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.3rem' }}
                      >
                        <Archive size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        title="Delete permanently"
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.3rem' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog for Project Create / Edit */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem',
          overflowY: 'auto',
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '820px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-xl)',
          }}>
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', margin: 0 }}>
                  {isEditing ? 'Edit Construction Project' : 'Create New Construction Project'}
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                  City/area location, objectives, milestones, and high-resolution photo gallery.
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={22} color="#64748b" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSaveProject} style={{ padding: '2rem', overflowY: 'auto' }}>
              <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Project Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Greenwood Contemporary Villa"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">URL Slug (leave blank to auto-generate)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. greenwood-contemporary-villa"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-3" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="turnkey">Turnkey Construction</option>
                    <option value="residential">Residential Building</option>
                    <option value="commercial">Commercial Structure</option>
                    <option value="interiors">Interior Fitout</option>
                    <option value="exteriors">Exterior Facade</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">City / Area Location *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Bengaluru, Whitefield"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Project Execution Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="planned">Planned</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Public Project Description *</label>
                <textarea
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Detailed architectural scope, structural engineering specifications, RCC mix, square footage, and unique project features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Key Engineering Objectives & Specs (one per line)</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="e.g.&#10;M25 Grade Ready-Mix Concrete&#10;Fe550D TMT Reinforcement Bars&#10;Multi-tier elastomeric waterproofing"
                  value={formData.objectivesText}
                  onChange={(e) => setFormData({ ...formData, objectivesText: e.target.value })}
                ></textarea>
              </div>

              {/* Cover Image Upload */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                  Project Cover Image (JPEG/PNG/WebP, max 5MB)
                </label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleImageUpload(e, false)}
                    disabled={uploadingImage}
                    style={{ fontSize: '0.88rem' }}
                  />
                  {uploadingImage && <span style={{ fontSize: '0.85rem', color: '#d97706' }}>Uploading image...</span>}
                </div>
                {formData.coverImage && (
                  <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverImage: '' })}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#ef4444', borderColor: '#fca5a5' }}
                    >
                      Remove Cover
                    </button>
                  </div>
                )}
              </div>

              {/* Milestones Management */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: '#0f172a' }}>Execution Milestones Timeline</h4>
                
                {/* Existing Milestones List */}
                {formData.milestones.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    {formData.milestones.map((m, mIdx) => (
                      <div key={mIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '0.65rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                        <div>
                          <strong>{m.title}</strong>
                          <span style={{ fontSize: '0.75rem', marginLeft: '0.5rem', color: '#64748b' }}>({m.status})</span>
                          {m.description && <p style={{ fontSize: '0.8rem', margin: 0, color: '#64748b' }}>{m.description}</p>}
                        </div>
                        <button type="button" onClick={() => removeMilestone(mIdx)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Milestone Inputs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr auto', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Milestone Title (e.g. Foundation Cast)"
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Brief description..."
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                    value={newMilestone.description}
                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  />
                  <select
                    className="form-select"
                    style={{ fontSize: '0.85rem' }}
                    value={newMilestone.status}
                    onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value })}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button type="button" onClick={addMilestone} className="btn btn-outline btn-sm">
                    Add
                  </button>
                </div>
              </div>

              {/* Publication Status Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Publication Visibility:</span>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="publicationStatus"
                      value="draft"
                      checked={formData.publicationStatus === 'draft'}
                      onChange={(e) => setFormData({ ...formData, publicationStatus: e.target.value })}
                    />
                    Save as Draft (Private)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="publicationStatus"
                      value="published"
                      checked={formData.publicationStatus === 'published'}
                      onChange={(e) => setFormData({ ...formData, publicationStatus: e.target.value })}
                    />
                    Publish to Website
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Saving Project...' : isEditing ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
