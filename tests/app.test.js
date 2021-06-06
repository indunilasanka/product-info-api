import request from 'supertest';
import HttpStatus from 'http-status-codes';
import { app } from '../src/app';

describe('app test', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('It should response with OK when health-check invoked', async () => {
    const response = await request(app).get('/v1/product-info/health-check');
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  test('It should response with NOT_FOUND when url incomplete', async () => {
    const response = await request(app).get('/v1/product-info/');
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
