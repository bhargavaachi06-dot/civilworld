import React, { useEffect, useState } from 'react';
import { adminApi } from '../../api/client.js';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export const AuditLogsManager = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAuditLogs();
      if (res.success) {
        setLogs(res.data);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Security & Action Audit Logs</h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Immutable administrative event logging, login attempts, IP tracking, and system actions.
          </p>
        </div>
        <button onClick={loadLogs} className="btn btn-outline btn-sm">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Action Event</th>
              <th>Category</th>
              <th>User / Target</th>
              <th>Client IP</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem' }}>
                  Loading security audit trail...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#94a3b8' }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id}>
                  <td style={{ fontSize: '0.82rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    {log.action}
                  </td>
                  <td style={{ fontSize: '0.82rem' }}>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      {log.category}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {log.userEmail || 'system'}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    {log.ipAddress}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: log.status === 'SUCCESS' ? '#ecfdf5' : '#fef2f2', color: log.status === 'SUCCESS' ? '#065f46' : '#b91c1c', fontWeight: 700 }}>
                      {log.status}
                    </span>
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

export default AuditLogsManager;
