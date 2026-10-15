import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import express from 'express';
import request from 'supertest';
import app from '../src/app.js';
import Project from '../src/models/Project.js';
import {
  detectImageSignature,
  projectImageUploadMiddleware,
  uploadDir,
} from '../src/middleware/upload.js';

test('CivilWorld Construction Project Portfolio Manager Test Suite', async (t) => {
  await t.test('1. GET /api/public/projects should return 200 with public portfolio data array', async () => {
    const res = await request(app).get('/api/public/projects');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
  });

  await t.test('2. GET /api/public/projects with category query filter should respond cleanly', async () => {
    const res = await request(app).get('/api/public/projects?category=turnkey');
    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
  });

  await t.test('3. GET /api/admin/projects without authentication should return 401 Unauthorized', async () => {
    const res = await request(app).get('/api/admin/projects');
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /access denied/i);
  });

  await t.test('4. POST /api/admin/projects without authentication should return 401 Unauthorized', async () => {
    const res = await request(app)
      .post('/api/admin/projects')
      .send({
        title: 'Unauthorized Villa',
        category: 'residential',
        description: 'Should fail authentication',
        location: 'Bengaluru',
      });
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(res.body.success, false);
  });

  await t.test('5. PATCH /api/admin/projects/:id/publish without authentication should return 401 Unauthorized', async () => {
    const res = await request(app)
      .patch('/api/admin/projects/507f1f77bcf86cd799439011/publish')
      .send({ publicationStatus: 'published' });
    assert.strictEqual(res.statusCode, 401);
  });

  await t.test('6. POST /api/admin/projects/upload-image without authentication should return 401 Unauthorized', async () => {
    const res = await request(app).post('/api/admin/projects/upload-image');
    assert.strictEqual(res.statusCode, 401);
  });

  await t.test('7. Project model validation should reject invalid categories', () => {
    const invalidProject = new Project({
      title: 'Invalid Category Project',
      category: 'space_station',
      description: 'Testing schema validation',
      location: 'Bengaluru',
    });

    const error = invalidProject.validateSync();
    assert.ok(error);
    assert.ok(error.errors.category);
  });

  await t.test('8. Project model validation should require location and description', () => {
    const incompleteProject = new Project({
      title: 'Incomplete Villa',
      category: 'residential',
    });

    const error = incompleteProject.validateSync();
    assert.ok(error);
    assert.ok(error.errors.description);
    assert.ok(error.errors.location);
  });

  await t.test('9. Project model should auto-generate valid URL slug from title', () => {
    const project = new Project({
      title: 'Greenwood Contemporary Villa & Suites!',
      category: 'turnkey',
      description: 'Full turnkey construction execution',
      location: 'Bengaluru, Whitefield',
    });

    project.validateSync();
    assert.strictEqual(project.slug, 'greenwood-contemporary-villa-suites');
  });

  await t.test('10. Project toPublicJSON should not expose internal admin creator fields', () => {
    const project = new Project({
      title: 'Aura Heights',
      slug: 'aura-heights',
      category: 'commercial',
      description: 'Commercial complex',
      location: 'Bengaluru, Indiranagar',
      status: 'planned',
      publicationStatus: 'published',
      createdBy: '507f1f77bcf86cd799439011',
      updatedBy: '507f1f77bcf86cd799439012',
    });

    const publicJson = project.toPublicJSON();
    assert.strictEqual(publicJson.title, 'Aura Heights');
    assert.strictEqual(publicJson.createdBy, undefined);
    assert.strictEqual(publicJson.updatedBy, undefined);
  });

  // ==========================================
  // IMAGE SIGNATURE VALIDATION SECURITY TESTS
  // ==========================================
  const sampleJpeg = Buffer.from([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0xff, 0xd9,
  ]);

  const samplePng = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52,
    0x00, 0x00, 0x00, 0x01,
    0x00, 0x00, 0x00, 0x01,
    0x08, 0x06, 0x00, 0x00, 0x00,
    0x1f, 0x15, 0xc4, 0x89,
    0x00, 0x00, 0x00, 0x00,
    0x49, 0x45, 0x4e, 0x44,
    0xae, 0x42, 0x60, 0x82,
  ]);

  const sampleWebp = Buffer.from([
    0x52, 0x49, 0x46, 0x46, // 'RIFF'
    0x14, 0x00, 0x00, 0x00,
    0x57, 0x45, 0x42, 0x50, // 'WEBP'
    0x56, 0x50, 0x38, 0x20, // 'VP8 '
    0x08, 0x00, 0x00, 0x00,
    0x30, 0x01, 0x00, 0x9d, 0x01, 0x2a, 0x01, 0x00,
  ]);

  const sampleExe = Buffer.from([
    0x4d, 0x5a, 0x90, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00, 0x00,
    0xff, 0xff, 0x00, 0x00, 0xb8, 0x00, 0x00, 0x00,
  ]);

  await t.test('11. detectImageSignature should correctly recognize JPEG, PNG, and WebP binary headers', () => {
    assert.strictEqual(detectImageSignature(sampleJpeg), 'jpeg');
    assert.strictEqual(detectImageSignature(samplePng), 'png');
    assert.strictEqual(detectImageSignature(sampleWebp), 'webp');
    assert.strictEqual(detectImageSignature(sampleExe), null);
    assert.strictEqual(detectImageSignature(Buffer.from([0x00, 0x01])), null);
  });

  const uploadApp = express();
  uploadApp.post('/test-upload', projectImageUploadMiddleware, (req, res) => {
    res.status(200).json({
      success: true,
      file: req.file.filename,
      path: req.file.path,
    });
  });

  await t.test('12. Upload middleware should accept valid JPEG file', async () => {
    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', sampleJpeg, { filename: 'project-photo.jpg', contentType: 'image/jpeg' });

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.file);
    if (res.body.path && fs.existsSync(res.body.path)) {
      fs.unlinkSync(res.body.path);
    }
  });

  await t.test('13. Upload middleware should accept valid PNG file', async () => {
    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', samplePng, { filename: 'elevation-render.png', contentType: 'image/png' });

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.file);
    if (res.body.path && fs.existsSync(res.body.path)) {
      fs.unlinkSync(res.body.path);
    }
  });

  await t.test('14. Upload middleware should accept valid WebP file', async () => {
    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', sampleWebp, { filename: 'site-cover.webp', contentType: 'image/webp' });

    assert.strictEqual(res.statusCode, 200);
    assert.strictEqual(res.body.success, true);
    assert.ok(res.body.file);
    if (res.body.path && fs.existsSync(res.body.path)) {
      fs.unlinkSync(res.body.path);
    }
  });

  await t.test('15. Upload middleware should reject arbitrary executable binary disguised as .png', async () => {
    const filesBefore = fs.readdirSync(uploadDir);

    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', sampleExe, { filename: 'malicious.png', contentType: 'image/png' });

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /signature does not match/i);

    // Verify no temporary file was left behind
    const filesAfter = fs.readdirSync(uploadDir);
    assert.strictEqual(filesAfter.length, filesBefore.length);
  });

  await t.test('16. Upload middleware should reject image with mismatched format vs declared extension', async () => {
    const filesBefore = fs.readdirSync(uploadDir);

    // Send valid JPEG bytes disguised as a .png filename and image/png MIME
    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', sampleJpeg, { filename: 'disguised.png', contentType: 'image/png' });

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /format mismatch/i);

    const filesAfter = fs.readdirSync(uploadDir);
    assert.strictEqual(filesAfter.length, filesBefore.length);
  });

  await t.test('17. Upload middleware should reject truncated image file and leave no temporary file', async () => {
    const filesBefore = fs.readdirSync(uploadDir);

    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', Buffer.from([0xff, 0xd8]), { filename: 'corrupted.jpg', contentType: 'image/jpeg' });

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);

    const filesAfter = fs.readdirSync(uploadDir);
    assert.strictEqual(filesAfter.length, filesBefore.length);
  });

  await t.test('18. Upload middleware should reject files exceeding the 5MB size limit', async () => {
    const oversizedBuffer = Buffer.alloc(5.5 * 1024 * 1024);

    const res = await request(uploadApp)
      .post('/test-upload')
      .attach('image', oversizedBuffer, { filename: 'huge-render.jpg', contentType: 'image/jpeg' });

    assert.strictEqual(res.statusCode, 400);
    assert.strictEqual(res.body.success, false);
    assert.match(res.body.message, /5MB limit/i);
  });
});

