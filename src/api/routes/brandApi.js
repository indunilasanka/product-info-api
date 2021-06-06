import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import BrandService from '../../service/brandService';
import { createSuccessResponse, sendErrorResponse } from '../../middleware/responseGenerator';
import {
  BRAND_CREATE_SUCCESSFUL,
  BRAND_FETCHING_SUCCESSFUL,
  BRANDS_FETCHING_SUCCESSFUL,
  ERROR_CREATING_BRAND,
  ERROR_FETCHING_BRAND,
  ERROR_FETCHING_BRANDS,
} from '../../util/constant';

export default () => {
  const brandRouter = new Router({ mergeParams: true });

  brandRouter.get('/', async (req, res) => {
    try {
      const response = await BrandService.getAllBrands();
      res.status(HttpStatus.OK)
        .send(createSuccessResponse(response, BRANDS_FETCHING_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_FETCHING_BRANDS);
    }
  });

  brandRouter.get('/:brand_id', async (req, res) => {
    try {
      const brandId = req.params.brand_id;
      const response = await BrandService.getBrandById(brandId);
      res.status(HttpStatus.OK).send(createSuccessResponse(response, BRAND_FETCHING_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_FETCHING_BRAND);
    }
  });

  brandRouter.post('/', async (req, res) => {
    try {
      const brandData = req.body;
      const response = await BrandService.createBrand(brandData);
      res.status(HttpStatus.OK).send(createSuccessResponse(response, BRAND_CREATE_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_CREATING_BRAND);
    }
  });

  return brandRouter;
};
