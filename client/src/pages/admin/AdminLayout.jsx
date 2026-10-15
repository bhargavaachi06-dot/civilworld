import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Globe,
  Building2,
  Inbox,
  GraduationCap,
  BookOpen,
  FileText,
  Award,
  Briefcase,
  Bell,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  HardHat,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Website Content', path: '/admin/content', icon: Globe },
    { name: 'Construction Projects', path: '/admin/projects', icon: Building2 },
    { name: 'Construction Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Students', path: '/admin/students', icon: GraduationCap },
    { name: 'Training Programs', path: '/admin/training', icon: BookOpen },
    { name: 'Documentation', path: '/admin/docs', icon: FileText },
    { name: 'Certificates', path: '/admin/certificates', icon: Award },
    { name: 'Careers', path: '/admin/careers', icon: Briefcase },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell },
    { name: 'Users & Permissions', path: '/admin/users', icon: Users },
    { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: '270px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          borderRight: '1px solid #1e293b',
        }}
      >
        <div className="admin-sidebar-header">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#ffffff' }}>
            <div className="brand-icon-box" style={{ width: '34px', height: '34px' }}>
              <HardHat size={20} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.15rem' }}>
              CIVIL<span style={{ color: '#d97706' }}>WORLD</span>
            </span>
          </Link>
          <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(217, 119, 6, 0.2)', color: '#f59e0b', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
            ADMIN
          </span>
        </div>

        {/* Navigation list */}
        <nav className="admin-nav" style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer" style={{ borderTop: '1px solid #1e293b', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>{user?.name || 'Administrator'}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{user?.email || 'admin@civilworld.com'}</div>
          </div>
          <button
            onClick={handleLogout}
            title="Secure Logout"
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.4rem', borderRadius: '6px', display: 'flex' }}
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'md:none' }}
              aria-label="Toggle Navigation"
            >
              <Menu size={22} color="#0f172a" />
            </button>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
              CivilWorld Management System &bull; Dedicated Database: <strong style={{ color: '#0f172a' }}>civilworld_db</strong>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              to="/"
              target="_blank"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#d97706', fontWeight: 600 }}
            >
              Public Website <ExternalLink size={14} />
            </Link>
            <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ borderColor: '#fca5a5', color: '#b91c1c' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </header>

        {/* Content View */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
