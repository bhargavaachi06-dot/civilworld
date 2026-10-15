import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

test('CivilWorld Backend API Core & Security Test Suite', async (t) => {
  await t.test('1. GET /api/health should return 200 with service information and dedicated DB target', async () => {
    const res = await request(app).get('/api/health');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.status, 'ok');
    assert.strictEqual(res.body.database.target, 'civilworld_db');
    assert.ok(res.body.service);
  });

  await t.test('2. POST /api/auth/login with missing credentials should return 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({});
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /valid email address/i);
  });

  await t.test('3. POST /api/auth/login with invalid email format should return 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'invalid-email', password: 'ValidPassword123!' });
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /valid email address/i);
  });

  await t.test('4. POST /api/auth/login with short password should return 400 Bad Request', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@civilworld.com', password: '123' });
    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /at least 8 characters/i);
  });

  await t.test('5. GET /api/admin/overview without authentication should return 401 Unauthorized', async () => {
    const res = await request(app).get('/api/admin/overview');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /access denied/i);
  });

  await t.test('6. GET /api/admin/overview with forged bearer token should return 401 Unauthorized', async () => {
    const res = await request(app)
      .get('/api/admin/overview')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.forged.token');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /invalid session authentication/i);
  });

  await t.test('7. POST /api/public/enquiry with valid input structure should validate properly', async () => {
    const res = await request(app)
      .post('/api/public/enquiry')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        interest: 'turnkey-projects',
        message: 'Looking for a turnkey residential villa construction proposal.',
      });
    // Even if DB is disconnected in mock test environment, controller responds gracefully with 503 or 201 if DB is connected
    assert.ok(res.statusCode === 201 || res.statusCode === 503);
  });

  await t.test('8. GET non-existent route should return 404 with standard JSON format', async () => {
    const res = await request(app).get('/api/non-existent-endpoint');
    assert.strictEqual(res.statusCode, 404);
    assert.strictEqual(res.body.success, false);
  });
});
