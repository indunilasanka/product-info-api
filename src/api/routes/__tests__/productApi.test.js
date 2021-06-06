import HttpStatus from 'http-status-codes';
import request from 'supertest';
import { app } from '../../../app';

jest.mock('../../../service/productService');

describe('routes: get /v1/product-info/products', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should respond with success status', async () => {
    const response = await request(app)
      .get('/v1/product-info/products')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toBeDefined();
  });
});

describe('routes: get /v1/product-info/products/:productId', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('should respond with OK status when data available for given id', async () => {
    const response = await request(app)
      .get('/v1/product-info/products/1')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(HttpStatus.OK);
    expect(response.body).toBeDefined();
  });

  test('should respond with BAD REQUEST status when data not available for given id', async () => {
    const response = await request(app)
      .get('/v1/product-info/products/10')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(response.body).toBeDefined();
  });
});
