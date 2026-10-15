import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Public Pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import ResidentialConstruction from './pages/ResidentialConstruction.jsx';
import CommercialConstruction from './pages/CommercialConstruction.jsx';
import InteriorDesign from './pages/InteriorDesign.jsx';
import ExteriorDesign from './pages/ExteriorDesign.jsx';
import TurnkeyProjects from './pages/TurnkeyProjects.jsx';
import EstimationBOQ from './pages/EstimationBOQ.jsx';
import ProjectPortfolio from './pages/ProjectPortfolio.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Academy from './pages/Academy.jsx';
import TrainingPrograms from './pages/TrainingPrograms.jsx';
import PracticalSiteTraining from './pages/PracticalSiteTraining.jsx';
import DocumentationTraining from './pages/DocumentationTraining.jsx';
import Careers from './pages/Careers.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';

// Admin Protected Pages
import AdminLayout from './pages/admin/AdminLayout.jsx';
import DashboardOverview from './pages/admin/DashboardOverview.jsx';
import ProjectsManager from './pages/admin/ProjectsManager.jsx';
import EnquiriesManager from './pages/admin/EnquiriesManager.jsx';
import AuditLogsManager from './pages/admin/AuditLogsManager.jsx';
import AdminPlaceholderModule from './pages/admin/AdminPlaceholderModule.jsx';

// Wrapper for public layout with Navbar & Footer
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  );
};

export const App = () => {
  return (
    <Routes>
      {/* 18 Public Pages */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/services/residential" element={<PublicLayout><ResidentialConstruction /></PublicLayout>} />
      <Route path="/services/commercial" element={<PublicLayout><CommercialConstruction /></PublicLayout>} />
      <Route path="/services/interior" element={<PublicLayout><InteriorDesign /></PublicLayout>} />
      <Route path="/services/exterior" element={<PublicLayout><ExteriorDesign /></PublicLayout>} />
      <Route path="/services/turnkey" element={<PublicLayout><TurnkeyProjects /></PublicLayout>} />
      <Route path="/services/estimation-boq" element={<PublicLayout><EstimationBOQ /></PublicLayout>} />
      <Route path="/portfolio" element={<PublicLayout><ProjectPortfolio /></PublicLayout>} />
      <Route path="/portfolio/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
      <Route path="/academy" element={<PublicLayout><Academy /></PublicLayout>} />
      <Route path="/academy/programs" element={<PublicLayout><TrainingPrograms /></PublicLayout>} />
      <Route path="/academy/site-training" element={<PublicLayout><PracticalSiteTraining /></PublicLayout>} />
      <Route path="/academy/documentation-training" element={<PublicLayout><DocumentationTraining /></PublicLayout>} />
      <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
      <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/admin/login" element={<PublicLayout><AdminLogin /></PublicLayout>} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="enquiries" element={<EnquiriesManager />} />
        <Route path="audit-logs" element={<AuditLogsManager />} />

        {/* Admin Shell Placeholder Modules */}
        <Route
          path="content"
          element={
            <AdminPlaceholderModule
              title="Website Content Management"
              description="Visual CMS to edit homepage hero headers, service cards, and contact information without editing code."
              plannedFeatures={[
                'Live text and banner editor for homepage',
                'FAQ and disclaimer editor',
                'SEO metadata and social preview manager',
              ]}
              moduleCategory="CMS"
            />
          }
        />
        <Route path="projects" element={<ProjectsManager />} />
        <Route
          path="students"
          element={
            <AdminPlaceholderModule
              title="Students Directory"
              description="Student enrollment records, attendance tracking on site visits, and assessment grades."
              plannedFeatures={[
                'Student registration and batch allocation',
                'Site safety induction sign-off checklist',
                'Assessment scorecards and practical grading',
              ]}
              moduleCategory="Academy"
            />
          }
        />
        <Route
          path="training"
          element={
            <AdminPlaceholderModule
              title="Training Programs Management"
              description="Configure course curricula, batch schedules, syllabus brochures, and seat availability."
              plannedFeatures={[
                'Add and edit training programs',
                'Batch calendar and intake dates',
                'Curriculum syllabus PDF manager',
              ]}
              moduleCategory="Academy"
            />
          }
        />
        <Route
          path="docs"
          element={
            <AdminPlaceholderModule
              title="Engineering Documentation Library"
              description="Standard templates for Daily Progress Reports (DPR), Measurement Books (M-Book), BBS sheets, and rate analysis."
              plannedFeatures={[
                'Standard DPR Excel and PDF templates',
                'CPWD/State SSR schedule rate sheets',
                'Safety checklists and pour inspection forms',
              ]}
              moduleCategory="Technical"
            />
          }
        />
        <Route
          path="certificates"
          element={
            <AdminPlaceholderModule
              title="Certificates & Verification"
              description="Issue training completion certificates and provide public verification codes."
              plannedFeatures={[
                'Generate verifiable certificate IDs with QR codes',
                'Public certificate verification lookup interface',
                'Downloadable high-resolution digital certificates',
              ]}
              moduleCategory="Academy"
            />
          }
        />
        <Route
          path="careers"
          element={
            <AdminPlaceholderModule
              title="Careers & Placements"
              description="Manage job listings, internship applications, and corporate contractor partner introductions."
              plannedFeatures={[
                'Job opening publisher and expiry controls',
                'Candidate application review and resume downloads',
                'Hiring company partnership network directory',
              ]}
              moduleCategory="Talent"
            />
          }
        />
        <Route
          path="announcements"
          element={
            <AdminPlaceholderModule
              title="Announcements & News"
              description="Broadcast notifications regarding upcoming academy batches and company project milestones."
              plannedFeatures={[
                'Homepage announcement ticker',
                'Batch commencement alerts',
                'Push notification drafts',
              ]}
              moduleCategory="Communication"
            />
          }
        />
        <Route
          path="users"
          element={
            <AdminPlaceholderModule
              title="Users & Permissions"
              description="Manage administrator team accounts, assign roles (Superadmin, Site Manager, Academy Counselor), and audit access."
              plannedFeatures={[
                'Role-Based Access Control (RBAC) assignment',
                'Admin account locking and unlock controls',
                'Session activity monitor',
              ]}
              moduleCategory="Security"
            />
          }
        />
        <Route
          path="settings"
          element={
            <AdminPlaceholderModule
              title="System Settings"
              description="Global portal configuration, security parameters, and notification webhooks."
              plannedFeatures={[
                'CORS and trusted origin configuration',
                'Email notification SMTP credentials',
                'Automated civilworld_db backup scheduler',
              ]}
              moduleCategory="Configuration"
            />
          }
        />
      </Route>

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <PublicLayout>
            <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
              <h1 style={{ fontSize: '3.5rem', color: '#d97706', marginBottom: '1rem' }}>404</h1>
              <h2>Page Not Found</h2>
              <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                The page you are looking for does not exist or has moved.
              </p>
              <a href="/" className="btn btn-primary">
                Return to Homepage
              </a>
            </div>
          </PublicLayout>
        }
      />
    </Routes>
  );
};

export default App;
