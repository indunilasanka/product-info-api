import { getEntity } from '../model';
import logger from '../util/logger';

class BrandDao {
  async getAllBrands() {
    return getEntity('brand').findAll();
  }

  async getBrandByName(brandName) {
    logger.debug(`: ${brandName}`);
    const response = await getEntity('brand').findOne({
      where: {
        brandName,
      },
    });

    logger.debug(`: ${response}`);
    if (response) {
      return response.get();
    }
    return null;
  }

  async getBrandById(brandId) {
    logger.debug(`: ${brandId}`);
    const response = await getEntity('brand').findOne({
      where: {
        brandId,
      },
    });

    logger.debug(`brand response for given id: ${response}`);
    return response;
  }

  async createBrand(brand) {
    const response = await getEntity('brand').create(brand);
    logger.debug(`created brand response: ${response}`);
    return response.get();
  }
}

export default new BrandDao();
