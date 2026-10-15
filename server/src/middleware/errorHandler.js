import config from '../config/index.js';

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  // Safe console log for developers on the server
  console.error('[Error Details]:', {
    message: err.message,
    status: err.status || 500,
    path: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  // Never expose raw stack trace or internal database credentials to clients
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  
  res.status(statusCode).json({
    success: false,
    message: err.isOperational ? err.message : (statusCode === 500 ? 'An internal server error occurred. Please contact the administrator.' : err.message),
    ...(config.env === 'development' && { devHint: err.message }),
  });
};
