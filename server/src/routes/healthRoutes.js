import express from 'express';
import { isDbConnected } from '../config/db.js';
import config from '../config/index.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbStatus = isDbConnected();

  res.status(dbStatus ? 200 : 200).json({
    status: 'ok',
    service: 'CivilWorld API Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: config.env,
    database: {
      target: 'civilworld_db',
      connected: dbStatus,
      status: dbStatus ? 'HEALTHY' : 'OFFLINE_OR_CONNECTING',
    },
    uptime: Math.floor(process.uptime()),
  });
});

export default router;
