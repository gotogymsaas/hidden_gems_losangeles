const request = require('supertest');
const app = require('../src/index');
const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

describe('POST /api/levels/:id/result', () => {
  it('returns success true', async () => {
    const token = jwt.sign({ id: 'user1' }, process.env.JWT_SECRET);
    const res = await request(app)
      .post('/api/levels/1/result')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, level: '1' });
  });
});
