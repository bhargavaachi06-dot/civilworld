import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import config from '../config/index.js';
import { isDbConnected } from '../config/db.js';

// Helper to sign JWT
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn,
    }
  );
};

// Cookie options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: 'lax',
  maxAge: config.cookieExpiresDays * 24 * 60 * 60 * 1000,
  path: '/',
});

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.connection?.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database service is currently offline. Please ensure MongoDB is running (e.g. `Start-Service MongoDB` in Windows PowerShell).',
      });
    }

    // Find user by lowercase email and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      // Record failed attempt audit
      await AuditLog.create({
        userEmail: email,
        action: 'LOGIN_FAILED_UNKNOWN_USER',
        category: 'AUTH',
        ipAddress,
        userAgent,
        status: 'FAILURE',
        details: { reason: 'User not found' },
      }).catch((e) => console.error('Audit log error:', e.message));

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password combination.',
      });
    }

    // Check if account is locked
    if (user.isLocked()) {
      const waitMinutes = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
      return res.status(423).json({
        success: false,
        message: `Account is temporarily locked due to excessive failed attempts. Please retry in ${waitMinutes} minute(s).`,
      });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      await user.incrementLoginAttempts();

      await AuditLog.create({
        userId: user._id,
        userEmail: user.email,
        action: 'LOGIN_FAILED_INVALID_PASSWORD',
        category: 'AUTH',
        ipAddress,
        userAgent,
        status: 'FAILURE',
        details: { attempts: user.loginAttempts + 1 },
      }).catch((e) => console.error('Audit log error:', e.message));

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password combination.',
      });
    }

    // Check account status
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your administrator account is inactive. Please contact system superadmin.',
      });
    }

    // Reset attempts and update lastLogin
    await user.resetLoginAttempts();

    // Generate JWT token
    const token = generateToken(user);

    // Set secure HttpOnly cookie
    res.cookie('cw_auth_token', token, getCookieOptions());

    // Record audit log
    await AuditLog.create({
      userId: user._id,
      userEmail: user.email,
      action: 'LOGIN_SUCCESS',
      category: 'AUTH',
      ipAddress,
      userAgent,
      status: 'SUCCESS',
      details: { role: user.role },
    }).catch((e) => console.error('Audit log error:', e.message));

    return res.status(200).json({
      success: true,
      message: 'Authentication successful. Welcome to CivilWorld Administration.',
      token, // Also provided for bearer token clients
      user: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  const ipAddress = req.ip || req.connection?.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  let userId = req.user?._id || null;
  let userEmail = req.user?.email || null;

  // If req.user is not yet attached by middleware, decode token safely
  if (!userId) {
    const token =
      req.cookies?.cw_auth_token ||
      (req.headers.authorization?.startsWith('Bearer ') &&
        req.headers.authorization.split(' ')[1]);

    if (token) {
      try {
        const decoded = jwt.verify(token, config.jwtSecret);
        userId = decoded.id;
        userEmail = decoded.email || 'admin_user';
      } catch (err) {
        // Token expired or invalid, still clear cookie cleanly
      }
    }
  }

  if (userId) {
    await AuditLog.create({
      userId,
      userEmail: userEmail || 'admin_user',
      action: 'LOGOUT',
      category: 'AUTH',
      ipAddress,
      userAgent,
      status: 'SUCCESS',
    }).catch((e) => console.error('Audit log error:', e.message));
  }

  res.clearCookie('cw_auth_token', {
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'lax',
    path: '/',
  });

  return res.status(200).json({
    success: true,
    message: 'Successfully logged out.',
  });
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user.toSafeObject(),
  });
};
