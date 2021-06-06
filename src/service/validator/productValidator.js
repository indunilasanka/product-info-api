import Ajv from 'ajv';
import InvalidRequestException from '../../exception/InvalidRequestException';
import brandDao from '../../dao/brandDao';
import {
  BRAND_NAME_NOT_AVAILABLE,
  BRAND_NAME_NOT_AVAILABLE_CODE,
  PRODUCT_SLUG_EXIST,
  PRODUCT_SLUG_EXIST_CODE, VALIDATION_ERRORS_CODE,
} from '../../util/constant';
import productDao from '../../dao/productDao';

const ajv = new Ajv({ coerceTypes: true, format: 'full' });

ajv.addKeyword('isNotEmpty', {
  type: 'string',
  validate(schema, data) {
    return typeof data === 'string' && data.trim() !== '';
  },
  errors: false,
});

const mainSchema = {
  type: 'object',
  properties: {
    productName: { type: 'string', isNotEmpty: true, maxLength: 20 },
    productSlug: { type: 'string', isNotEmpty: true, maxLength: 20 },
    sku: { type: 'string', isNotEmpty: false, maxLength: 20 },
    brandId: { type: 'number', isNotEmpty: true, maxLength: 10 },
    additionalProperties: false,
  },
  required: [
    'productName',
    'productSlug',
    'sku',
    'brandId',
  ],
};

const Validator = ajv.compile(mainSchema);

export const validateProductCreateRequest = async (data) => {
  if (!Validator(data)) {
    throw new InvalidRequestException(VALIDATION_ERRORS_CODE, Validator.errors);
  }

  let result = await productDao.getProductBySlug(data.productSlug);
  if (result) {
    throw new InvalidRequestException(PRODUCT_SLUG_EXIST_CODE, PRODUCT_SLUG_EXIST);
  }

  result = await brandDao.getBrandById(data.brandId);
  if (!result) {
    throw new InvalidRequestException(BRAND_NAME_NOT_AVAILABLE_CODE, BRAND_NAME_NOT_AVAILABLE);
  }

  return true;
};

export const validateUpdateRequest = async (data) => {
  let result;
  if (data.productSlug) {
    result = await productDao.getProductBySlug(data.productSlug);
    if (result && result.productId != data.productId) {
      throw new InvalidRequestException(PRODUCT_SLUG_EXIST_CODE, PRODUCT_SLUG_EXIST);
    }
  }

  if (data.brandId) {
    result = await brandDao.getBrandById(data.brandId);
    if (!result) {
      throw new InvalidRequestException(BRAND_NAME_NOT_AVAILABLE_CODE, BRAND_NAME_NOT_AVAILABLE);
    }
  }

  return true;
};
