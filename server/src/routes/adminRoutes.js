import express from 'express';
import {
  getDashboardOverview,
  getAuditLogs,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/adminController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require valid authentication
router.use(protect);

// Dashboard overview stats
router.get('/overview', getDashboardOverview);

// Security audit logs
router.get('/audit-logs', getAuditLogs);

// Lead / Enquiry management
router.get('/enquiries', getEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);

// Placeholder modules endpoint for front-end architecture
router.get('/modules/:moduleName', (req, res) => {
  res.status(200).json({
    success: true,
    module: req.params.moduleName,
    message: `Module "${req.params.moduleName}" is configured in the CivilWorld Admin Shell. Full business logic will connect in the subsequent milestone.`,
  });
});

export default router;
