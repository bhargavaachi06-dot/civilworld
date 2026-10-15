import readline from 'readline';
import mongoose from 'mongoose';
import config from '../config/index.js';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createInitialAdmin() {
  console.log('========================================================');
  console.log(' CivilWorld Secure Initial Administrator Setup Procedure ');
  console.log(' Dedicated Database Target: civilworld_db              ');
  console.log('========================================================\n');

  try {
    // Enforce safety target check
    if (!config.mongodbUri.toLowerCase().includes('civilworld_db')) {
      throw new Error('Database safety check failed: MONGODB_URI does not contain civilworld_db.');
    }

    console.log('Connecting to database...');
    await mongoose.connect(config.mongodbUri);
    console.log('Connected to MongoDB successfully.\n');

    // Prompt for admin details
    const nameInput = await askQuestion('Enter Administrator Full Name: ');
    const name = nameInput.trim();
    if (!name || name.length < 2) {
      console.error('Error: Name must be at least 2 characters.');
      process.exit(1);
    }

    const emailInput = await askQuestion('Enter Administrator Email Address: ');
    const email = emailInput.trim().toLowerCase();
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      console.error('Error: Invalid email format.');
      process.exit(1);
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.error(`Error: An administrator account with email "${email}" already exists.`);
      process.exit(1);
    }

    const password = await askQuestion('Enter Strong Password (min 8 chars, letters & numbers): ');
    if (!password || password.length < 8) {
      console.error('Error: Password must be at least 8 characters long.');
      process.exit(1);
    }

    const confirmPassword = await askQuestion('Confirm Password: ');
    if (password !== confirmPassword) {
      console.error('Error: Passwords do not match.');
      process.exit(1);
    }

    console.log('\nCreating secure administrator account...');
    const admin = new User({
      name,
      email,
      password, // Pre-save hook will hash this securely with bcrypt (12 salt rounds)
      role: 'superadmin',
      status: 'active',
    });

    await admin.save();

    await AuditLog.create({
      userId: admin._id,
      userEmail: admin.email,
      action: 'INITIAL_ADMIN_CREATED_VIA_CLI',
      category: 'ADMIN_ACTION',
      status: 'SUCCESS',
      details: { role: 'superadmin' },
    });

    console.log('\n========================================================');
    console.log(' [SUCCESS] Administrator account created successfully!');
    console.log(` Admin ID:    ${admin._id}`);
    console.log(` Email:       ${admin.email}`);
    console.log(` Role:        ${admin.role}`);
    console.log(' Password:    [SECURED & HASHED - NEVER LOGGED]');
    console.log('========================================================\n');
  } catch (error) {
    console.error('Failed to create administrator:', error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
    process.exit(0);
  }
}

createInitialAdmin();
