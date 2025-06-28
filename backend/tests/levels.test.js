const request = require('supertest');
const app = require('../src/index');

describe('POST /api/levels/:id/result', () => {
  it('returns success true', async () => {
    const res = await request(app).post('/api/levels/1/result');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, level: '1' });
  });
});
