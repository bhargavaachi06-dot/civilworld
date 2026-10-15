import express from 'express';
import {
  getDashboardOverview,
  getAuditLogs,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/adminController.js';
import {
  getAdminProjects,
  getAdminProjectById,
  createProject,
  updateProject,
  publishProject,
  archiveProject,
  deleteProject,
  uploadProjectImage,
} from '../controllers/projectController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { projectImageUploadMiddleware } from '../middleware/upload.js';

const router = express.Router();

// All admin routes require valid authentication
router.use(protect);

// Dashboard overview & telemetry
router.get('/overview', getDashboardOverview);

// Security audit logs
router.get('/audit-logs', getAuditLogs);

// Lead / Enquiry management
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);

// ===============================================
// CONSTRUCTION PROJECT PORTFOLIO MANAGER ROUTES
// ===============================================
router.get('/projects', getAdminProjects);
router.post('/projects', requireRole('admin', 'superadmin'), createProject);
router.get('/projects/:id', getAdminProjectById);
router.put('/projects/:id', requireRole('admin', 'superadmin'), updateProject);
router.patch('/projects/:id/publish', requireRole('admin', 'superadmin'), publishProject);
router.patch('/projects/:id/archive', requireRole('admin', 'superadmin'), archiveProject);
router.delete('/projects/:id', requireRole('admin', 'superadmin'), deleteProject);
router.post(
  '/projects/upload-image',
  requireRole('admin', 'superadmin'),
  projectImageUploadMiddleware,
  uploadProjectImage
);

// Placeholder modules endpoint for remaining front-end views
router.get('/modules/:moduleName', (req, res) => {
  res.status(200).json({
    success: true,
    module: req.params.moduleName,
    message: `Module "${req.params.moduleName}" is configured in the CivilWorld Admin Shell.`,
  });
});

export default router;
