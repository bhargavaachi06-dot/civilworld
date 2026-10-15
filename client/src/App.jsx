import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
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
