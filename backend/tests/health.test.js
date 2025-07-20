const request = require('supertest');
const app = require('../src/index');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('GET /api/health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
