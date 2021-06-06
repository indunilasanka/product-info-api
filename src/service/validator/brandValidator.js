import Ajv from 'ajv';
import InvalidRequestException from '../../exception/InvalidRequestException';
import brandDao from '../../dao/brandDao';
import { BRAND_NAME_EXIST, BRAND_NAME_EXIST_CODE, VALIDATION_ERRORS_CODE } from '../../util/constant';

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
    brandName: { type: 'string', isNotEmpty: true, maxLength: 150 },
  },
  required: [
    'brandName',
  ],
};

const Validator = ajv.compile(mainSchema);

export const validateBrandCreateRequest = async (data) => {
  if (!Validator(data)) {
    throw new InvalidRequestException(VALIDATION_ERRORS_CODE, Validator.errors);
  }

  const result = await brandDao.getBrandByName(data.brandName);
  if (result) {
    throw new InvalidRequestException(BRAND_NAME_EXIST_CODE, BRAND_NAME_EXIST);
  }

  return true;
};
