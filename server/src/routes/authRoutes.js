import express from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateLoginInput } from '../middleware/validate.js';

const router = express.Router();

// Strict rate-limited administrator login
router.post('/login', authLimiter, validateLoginInput, login);

// Secure logout
router.post('/logout', logout);

// Verify active session & fetch current admin identity
router.get('/me', protect, getMe);

export default router;
