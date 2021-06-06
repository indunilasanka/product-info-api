import brandDao from '../dao/brandDao';
import { validateBrandCreateRequest } from './validator/brandValidator';
import logger from '../util/logger';
import InvalidRequestException from '../exception/InvalidRequestException';
import {BRAND_NAME_NOT_AVAILABLE, BRAND_NAME_NOT_AVAILABLE_CODE} from '../util/constant';

class BrandService {
  static async getAllBrands() {
    const brands = await brandDao.getAllBrands();
    return { data: brands };
  }

  static async getBrandById(brandId) {
    const brand = await brandDao.getBrandById(brandId);

    if (!brand) {
      logger.error(`No brands available for given id: ${brandId}`);
      throw new InvalidRequestException(BRAND_NAME_NOT_AVAILABLE_CODE, BRAND_NAME_NOT_AVAILABLE);
    } else {
      return { data: brand };
    }
  }

  static async createBrand(brandData) {
    await validateBrandCreateRequest(brandData);
    const products = await brandDao.createBrand(brandData);
    return { data: products };
  }
}

export default BrandService;
