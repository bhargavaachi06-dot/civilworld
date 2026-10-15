import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  ShieldCheck,
  Users,
  Building2,
  GraduationCap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { adminApi, publicApi } from '../../api/client.js';

export const DashboardOverview = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOverview();
      if (res.success) {
        setOverviewData(res.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{ color: '#64748b' }}>Loading administrative telemetry...</p>
      </div>
    );
  }

  const stats = overviewData?.stats || {
    totalEnquiries: 0,
    totalAuditEvents: 0,
    totalAdmins: 1,
    constructionModulesCount: 7,
    trainingProgramsCount: 3,
  };

  const dbConnected = overviewData?.databaseConnected;

  return (
    <div>
      {/* Top Banner / System Health */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '0.25rem' }}>Administration Overview</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            CivilWorld management shell &bull; Session uptime: {overviewData?.uptimeSeconds || 0} seconds
          </p>
        </div>

        {/* Database Status Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: dbConnected ? '#ecfdf5' : '#fffbeb', border: `1px solid ${dbConnected ? '#a7f3d0' : '#fde68a'}`, padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.85rem' }}>
          {dbConnected ? (
            <>
              <CheckCircle2 size={16} color="#059669" />
              <span style={{ color: '#065f46', fontWeight: 600 }}>civilworld_db: ONLINE</span>
            </>
          ) : (
            <>
              <AlertTriangle size={16} color="#d97706" />
              <span style={{ color: '#92400e', fontWeight: 600 }}>MongoDB: OFFLINE (Backend Safe Mode)</span>
            </>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Total Enquiries</span>
            <div style={{ backgroundColor: '#fef3c7', padding: '0.4rem', borderRadius: '6px', color: '#d97706' }}>
              <Inbox size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.85rem', color: '#0f172a' }}>{stats.totalEnquiries}</h3>
          <Link to="/admin/enquiries" style={{ fontSize: '0.8rem', color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
            Manage Leads <ArrowRight size={12} />
          </Link>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Security Audit Events</span>
            <div style={{ backgroundColor: '#e0f2fe', padding: '0.4rem', borderRadius: '6px', color: '#0284c7' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.85rem', color: '#0f172a' }}>{stats.totalAuditEvents}</h3>
          <Link to="/admin/audit-logs" style={{ fontSize: '0.8rem', color: '#0284c7', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
            View Audit Trail <ArrowRight size={12} />
          </Link>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Construction Verticals</span>
            <div style={{ backgroundColor: '#f1f5f9', padding: '0.4rem', borderRadius: '6px', color: '#334155' }}>
              <Building2 size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.85rem', color: '#0f172a' }}>{stats.constructionModulesCount}</h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', display: 'block' }}>Turnkey, Resi, Comm, Facade</span>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Academy Programs</span>
            <div style={{ backgroundColor: '#ecfdf5', padding: '0.4rem', borderRadius: '6px', color: '#059669' }}>
              <GraduationCap size={18} />
            </div>
          </div>
          <h3 style={{ fontSize: '1.85rem', color: '#0f172a' }}>{stats.trainingProgramsCount}</h3>
          <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem', display: 'block' }}>Site, Drawing, BOQ/DPR</span>
        </div>
      </div>

      {/* Two Column Section: Recent Leads & Recent Audit Logs */}
      <div className="grid-2" style={{ gap: '2rem' }}>
        {/* Recent Enquiries */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Recent Enquiries & Leads</h3>
            <Link to="/admin/enquiries" className="btn btn-outline btn-sm">
              All Enquiries
            </Link>
          </div>

          {(!overviewData?.recentEnquiries || overviewData.recentEnquiries.length === 0) ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>
              No enquiries registered yet. Submissions from the website will appear here in real-time.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {overviewData.recentEnquiries.map((enq) => (
                <div key={enq._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>{enq.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{enq.interest} &bull; {enq.phone}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', backgroundColor: enq.status === 'new' ? '#fef3c7' : '#e0f2fe', color: enq.status === 'new' ? '#b45309' : '#0369a1', fontWeight: 600 }}>
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security Audit Activity */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Security Audit Activity</h3>
            <Link to="/admin/audit-logs" className="btn btn-outline btn-sm">
              Full Audit Trail
            </Link>
          </div>

          {(!overviewData?.recentAuditLogs || overviewData.recentAuditLogs.length === 0) ? (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', padding: '2rem 0' }}>
              No audit logs recorded yet.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {overviewData.recentAuditLogs.map((log) => (
                <div key={log._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>{log.action}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>User: {log.userEmail} &bull; IP: {log.ipAddress}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: log.status === 'SUCCESS' ? '#ecfdf5' : '#fef2f2', color: log.status === 'SUCCESS' ? '#065f46' : '#b91c1c', fontWeight: 600 }}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
