import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../models/User.js';
import { isDbConnected } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Extract from HttpOnly cookie first
  if (req.cookies && req.cookies.cw_auth_token) {
    token = req.cookies.cw_auth_token;
  }
  // 2. Fallback to Authorization: Bearer header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in to access this resource.',
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database temporarily unavailable. Please verify MongoDB service status.',
      });
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The administrator account associated with this session no longer exists.',
      });
    }

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Account is currently inactive or locked. Please contact superadmin.',
      });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Your session has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Invalid session authentication. Please log in again.',
    });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have the required permissions for this action.',
      });
    }
    next();
  };
};
