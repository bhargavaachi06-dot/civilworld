import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { publicApi } from '../api/client.js';

export const EnquiryForm = ({ defaultInterest = 'general-enquiry', title = 'Send Us an Enquiry' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: defaultInterest,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessResult(null);

    try {
      const res = await publicApi.submitEnquiry(formData);
      if (res.success) {
        setSuccessResult({
          message: res.message,
          refId: res.data?.referenceId,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: defaultInterest,
          message: '',
        });
      }
    } catch (err) {
      setErrorMsg(
        err.data?.message || err.message || 'Unable to submit enquiry. Please try again shortly.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '640px', margin: '0 auto', padding: '2.5rem' }}>
      <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{title}</h3>
      <p style={{ textAlign: 'center', marginBottom: '1.75rem', fontSize: '0.92rem' }}>
        Reach out for construction proposals, estimation audits, or student academy enrollment.
      </p>

      {successResult && (
        <div className="alert-box success">
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <div>
            <strong>Enquiry Registered Successfully!</strong>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem' }}>
              {successResult.message}
            </p>
            {successResult.refId && (
              <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: 0.85 }}>
                Lead Reference ID: <code>{successResult.refId}</code>
              </p>
            )}
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="alert-box danger">
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="form-input"
              placeholder="e.g. Rajesh Sharma"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="form-input"
              placeholder="e.g. +91 9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="interest">Area of Interest *</label>
            <select
              id="interest"
              name="interest"
              className="form-select"
              value={formData.interest}
              onChange={handleChange}
            >
              <optgroup label="Construction & Engineering">
                <option value="residential-construction">Residential Construction</option>
                <option value="commercial-construction">Commercial Construction</option>
                <option value="turnkey-projects">Turnkey Projects</option>
                <option value="interior-design">Interior Design & Execution</option>
                <option value="exterior-design">Exterior Design & Facade</option>
                <option value="estimation-boq">Estimation & BOQ Services</option>
              </optgroup>
              <optgroup label="CivilWorld Academy">
                <option value="academy-training">Academy Training Programs</option>
                <option value="practical-site-training">Practical Site Engineering</option>
                <option value="documentation-training">Documentation & DPR Training</option>
              </optgroup>
              <option value="general-enquiry">General Enquiry</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="message">Message / Requirements *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="form-textarea"
            placeholder="Describe your construction requirement, site location, or training goals..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: '0.5rem' }}
          disabled={loading}
        >
          {loading ? (
            'Submitting...'
          ) : (
            <>
              <Send size={16} /> Submit Project / Training Enquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
