import logger from "../../util/logger";
import {getEntity} from "../../model";

const response = [{
  productId:  1,
  productName: 'name1',
  productSlug: 'slug1',
  sku: 'sku1',
  brandId: 1
}, { productId:  2,
  productName: 'name2',
  productSlug: 'slug2',
  sku: 'sku2',
  brandId: 2
}];

class ProductDao {
  static async getAllProducts() {
    return response;
  }

  static async getProductById(productId) {
    if(response[0].productId === productId) {
      return response[0];
    } else if (response[1].productId === productId){
      return response[1];
    }
    return null;
  }

  static async getProductBySlug(productSlug) {
    if(response[0].productSlug === productSlug) {
      return response[0];
    } else if (response[1].productSlug === productSlug){
      return response[1];
    }
    return null;
  }
}

export default ProductDao;
