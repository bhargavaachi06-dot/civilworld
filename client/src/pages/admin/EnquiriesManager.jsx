import React, { useEffect, useState } from 'react';
import { adminApi } from '../../api/client.js';
import { Inbox, CheckCircle2, RefreshCw } from 'lucide-react';

export const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getEnquiries();
      if (res.success) {
        setEnquiries(res.data);
      }
    } catch (err) {
      console.error('Failed to load enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await adminApi.updateEnquiryStatus(id, newStatus);
      if (res.success) {
        setEnquiries(enquiries.map((e) => (e._id === id ? { ...e, status: newStatus } : e)));
      }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Construction & Academy Enquiries</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Incoming project consultation leads, estimation requests, and training applications.
          </p>
        </div>
        <button onClick={loadEnquiries} className="btn btn-outline btn-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Client / Student</th>
              <th>Contact Info</th>
              <th>Service Interest</th>
              <th>Message Note</th>
              <th>Status Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem' }}>
                  Loading enquiries...
                </td>
              </tr>
            ) : enquiries.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                  No customer or student enquiries found in civilworld_db yet.
                </td>
              </tr>
            ) : (
              enquiries.map((enq) => (
                <tr key={enq._id}>
                  <td style={{ fontSize: '0.82rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <strong>{enq.name}</strong>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    <div>{enq.email}</div>
                    <div style={{ color: '#64748b' }}>{enq.phone}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: '#d97706', fontWeight: 600 }}>
                    {enq.interest}
                  </td>
                  <td style={{ fontSize: '0.85rem', maxWidth: '300px' }}>
                    {enq.message}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.82rem' }}
                      value={enq.status}
                      disabled={updatingId === enq._id}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in-progress">In-Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesManager;
