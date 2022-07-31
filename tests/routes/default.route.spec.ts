import request from 'supertest';
import app from '../../app/main';
import statuses from '../../app/utils/status';

const { statusCodes: { CODE_NOT_FOUND, CODE_OK }} = statuses;
const { app: server } = app;

describe('Should return 404 if we visit a non-existant api', () => {
  beforeEach(async () => await server.delete);
  test('/api', async () => {
    const res = await request(app.app).get('/api');
    expect(res.status).toBe(CODE_NOT_FOUND);
    expect(res.body.message).toBe('Not found');
  });
});
