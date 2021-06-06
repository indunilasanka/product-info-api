import InvalidRequestException from "../../exception/InvalidRequestException";
import {PRODUCT_NOT_AVAILABLE, PRODUCT_NOT_AVAILABLE_CODE} from "../../util/constant";

const responses = [{
    productId: 1,
    productName: 'name1',
    productSlug: 'slug1',
    sku: 'sku1',
    brandId: 1
}, {
    productId: 2,
    productName: 'name2',
    productSlug: 'slug2',
    sku: 'sku2',
    brandId: 2
}];

class ProductService {
    static async getAllProducts() {
        return {data: responses};
    }

    static async getProductById(productId) {
        for (let i = 0; i < responses.length; i++) {
            if (responses[i].productId == productId || responses[i].productSlug == productId) {
                return {data: responses[i]};
            }
        }
        throw new InvalidRequestException(PRODUCT_NOT_AVAILABLE_CODE, PRODUCT_NOT_AVAILABLE);
    }
}

export default ProductService;
