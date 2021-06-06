import ProductService from '../productService';
import InvalidRequestException from '../../exception/InvalidRequestException';
import { PRODUCT_NOT_AVAILABLE } from '../../util/constant';

jest.mock('../../dao/productDao');

describe('ProductService:getAllProducts get all available products', () => {
  test('should respond with correct product list size and details', async () => {
    const response = await ProductService.getAllProducts();
    expect(response.data.length).toEqual(2);
    expect(response.data[0].productName).toEqual('name1');
  });
});

describe('ProductService:getProductById get relevant product', () => {
  test('should respond with correct product details for given id', async () => {
    const response = await ProductService.getProductById(1);
    expect(response.data.productName).toEqual('name1');
  });

  test('should respond with correct product details for given slug', async () => {
    const response = await ProductService.getProductById('slug2');
    expect(response.data.productName).toEqual('name2');
  });

  test('should throw a InvalidException if products not found', async () => {
    try {
      await ProductService.getProductById(3);
      expect(true).toBe(false);
    } catch (e) {
      expect(e instanceof InvalidRequestException).toBe(true);
      expect(e.message).toEqual(PRODUCT_NOT_AVAILABLE);
    }
  });
});

describe('ProductService:getAllProducts get all available products', () => {
  test('should respond with correct product list size and details', async () => {
    const response = await ProductService.getAllProducts();
    expect(response.data.length).toEqual(2);
    expect(response.data[0].productName).toEqual('name1');
  });
});
