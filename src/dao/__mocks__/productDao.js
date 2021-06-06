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

class ProductDao {
    static async getAllProducts() {
        return responses;
    }

    static async getProductById(productId) {
        if (responses[0].productId === productId) {
            return responses[0];
        } else if (responses[1].productId === productId) {
            return responses[1];
        }
        return null;
    }

    static async getProductBySlug(productSlug) {
        if (responses[0].productSlug === productSlug) {
            return responses[0];
        } else if (responses[1].productSlug === productSlug) {
            return responses[1];
        }
        return null;
    }
}

export default ProductDao;
