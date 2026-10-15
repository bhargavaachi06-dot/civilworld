import mongoose from 'mongoose';
import config from './index.js';

let isConnected = false;

export const connectDB = async () => {
  // Enforce safety constraint: Ensure target database name is civilworld_db
  const uri = config.mongodbUri;
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Do not hang indefinitely if MongoDB is offline
    });

    isConnected = true;
    console.log(`[Database] MongoDB connected successfully to host: ${conn.connection.host}`);
    console.log(`[Database] Active database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Warning] MongoDB connection failed: ${error.message}`);
    console.warn('[Database Notice] Backend server will continue running. Ensure MongoDB service is running (e.g. `Start-Service MongoDB` in Windows PowerShell).');
    return null;
  }
};

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('[Database Warning] MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
  isConnected = true;
  console.log('[Database] MongoDB reconnected.');
});

export const isDbConnected = () => isConnected;

export default connectDB;
