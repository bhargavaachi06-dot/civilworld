import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/civilworld_db',
  jwtSecret: process.env.JWT_SECRET || 'civilworld_fallback_secret_must_be_changed',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  cookieExpiresDays: parseInt(process.env.COOKIE_EXPIRES_DAYS || '1', 10),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  adminUrl: process.env.ADMIN_URL || 'http://localhost:5174',
};

// Safety verification: Ensure database URI explicitly targets civilworld_db
if (!config.mongodbUri.toLowerCase().includes('civilworld_db')) {
  console.warn(
    '[SAFETY ALERT] The configured MONGODB_URI does not explicitly include "civilworld_db". ' +
    'To protect against accidental database collision, CivilWorld operations must target civilworld_db.'
  );
}

export default config;
