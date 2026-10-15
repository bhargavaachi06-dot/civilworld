import express from 'express';
import { submitEnquiry, getPublicStats } from '../controllers/publicController.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';
import { validateEnquiryInput } from '../middleware/validate.js';

const router = express.Router();

router.post('/enquiry', enquiryLimiter, validateEnquiryInput, submitEnquiry);
router.get('/stats', getPublicStats);

export default router;
