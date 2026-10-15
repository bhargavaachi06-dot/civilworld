import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/index.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Route imports
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

const app = express();

// Security headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible development and Vite HMR
    crossOriginEmbedderPolicy: false,
  })
);

// Safe CORS setup
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman) in dev
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Access denied from this origin.'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsers with size limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Cookie parser for secure HttpOnly session tokens
app.use(cookieParser());

// Apply general API rate limiter to all API endpoints
app.use('/api', apiLimiter);

// Mount API routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);

// Root greeting / check
app.get('/', (req, res) => {
  res.json({
    name: 'CivilWorld Full-Stack Core API',
    status: 'online',
    documentation: '/api/health',
  });
});

// 404 Handler for undefined API routes
app.use(notFound);

// Centralized error handler
app.use(errorHandler);

export default app;
