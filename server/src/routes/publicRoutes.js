import express from 'express';
import { submitEnquiry, getPublicStats } from '../controllers/publicController.js';
import { getPublicProjects, getPublicProjectBySlug } from '../controllers/projectController.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';
import { validateEnquiryInput } from '../middleware/validate.js';

const router = express.Router();

// Lead generation & statistics
router.post('/enquiry', enquiryLimiter, validateEnquiryInput, submitEnquiry);
router.get('/stats', getPublicStats);

// Public construction project portfolio (published only)
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getPublicProjectBySlug);

export default router;
