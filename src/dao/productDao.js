import { getEntity, getSequelize } from '../model';
import logger from '../util/logger';

class ProductDao {
  async getAllProducts() {
    return getEntity('product').findAll();
  }

  async getProductById(productId) {
    logger.debug(`: ${productId}`);
    const response = getEntity('product').findOne({
      where: {
        productId,
      },
    });

    logger.debug(`Product response for given id : ${response}`);
    return response;
  }

  async getProductBySlug(productSlug) {
    logger.debug(`: ${productSlug}`);
    const response = getEntity('product').findOne({
      where: {
        productSlug,
      },
    });

    logger.debug(`Product response for given slug : ${response}`);
    return response;
  }

  async createProduct(product) {
    const response = await getEntity('product').create(product);
    logger.debug(`created product response: ${response}`);
    return response.get();
  }

  async updateProduct(product) {
    return getEntity('product').update(
      product,
      { where: { productId: product.productId } },
    );
  }

  async deleteProduct(productId) {
    return getEntity('product').destroy({ where: { productId } });
  }

  async loadProductDataFromCSV(filePath, lineSeparator) {
    const query = `LOAD DATA LOCAL INFILE ${filePath} REPLACE INTO TABLE product LINES TERMINATED BY '${lineSeparator}' IGNORE 1 LINES (productName, productSlug, sku, brandId);`;
    return getSequelize().query(query);
  }
}

export default new ProductDao();
