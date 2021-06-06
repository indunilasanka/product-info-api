import productDao from '../dao/productDao';
import { validateProductCreateRequest, validateUpdateRequest } from './validator/productValidator';
import InvalidRequestException from '../exception/InvalidRequestException';
import { PRODUCT_NOT_AVAILABLE, PRODUCT_NOT_AVAILABLE_CODE } from '../util/constant';
import logger from '../util/logger';
import { getLineSeparator } from '../util/helpers';

class ProductService {
  static async getAllProducts() {
    const products = await productDao.getAllProducts();
    // todo pagination
    return { data: products };
  }

  static async getProductById(productId) {
    let product = await productDao.getProductById(productId);

    if (!product) {
      product = await productDao.getProductBySlug(productId);
    }

    if (!product) {
      logger.error(`No products available for given id: ${productId}`);
      throw new InvalidRequestException(PRODUCT_NOT_AVAILABLE_CODE, PRODUCT_NOT_AVAILABLE);
    } else {
      return { data: product };
    }
  }

  static async createProduct(productData) {
    await validateProductCreateRequest(productData);
    const product = await productDao.createProduct(productData);
    return { data: product };
  }

  static async updateProduct(productData) {
    await validateUpdateRequest(productData);
    await productDao.updateProduct(productData);
  }

  static async deleteProduct(productId) {
    const response = await productDao.deleteProduct(productId);
    if (response !== 1) {
      logger.error(`No products available for given id: ${productId}`);
      throw new InvalidRequestException(PRODUCT_NOT_AVAILABLE_CODE, PRODUCT_NOT_AVAILABLE);
    }
  }

  static async loadProductsFromFile(request) {
    const lineSeparator = getLineSeparator();
    await productDao.loadProductDataFromCSV(request.filePath, lineSeparator);
  }
}

export default ProductService;
