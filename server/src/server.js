import app from './app.js';
import config from './config/index.js';
import connectDB from './config/db.js';

const startServer = async () => {
  // Connect to dedicated MongoDB instance
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`====================================================`);
    console.log(` CivilWorld API Server running in [${config.env}] mode`);
    console.log(` Listening on: http://localhost:${config.port}`);
    console.log(` Health check: http://localhost:${config.port}/api/health`);
    console.log(` Dedicated DB: civilworld_db`);
    console.log(`====================================================`);
  });

  // Handle process termination gracefully
  const gracefulShutdown = (signal) => {
    console.log(`Received ${signal}. Shutting down CivilWorld server gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer().catch((err) => {
  console.error('Fatal initialization error:', err);
  process.exit(1);
});
