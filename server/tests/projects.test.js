import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';
import Project from '../src/models/Project.js';

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
});
