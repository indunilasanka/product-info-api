import { Router } from 'express';
import HttpStatus from 'http-status-codes';

import ProductService from '../../service/productService';
import { createSuccessResponse, sendErrorResponse } from '../../middleware/responseGenerator';
import {
  BUCK_CREATE_SUCCESSFUL,
  ERROR_BULK_CREATE,
  ERROR_CREATING_PRODUCT,
  ERROR_DELETING_PRODUCT,
  ERROR_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCTS,
  ERROR_UPDATING_PRODUCT,
  PRODUCT_CREATE_SUCCESSFUL,
  PRODUCT_DELETE_SUCCESSFUL,
  PRODUCT_FETCHING_SUCCESSFUL,
  PRODUCT_UPDATE_SUCCESSFUL,
  PRODUCTS_FETCHING_SUCCESSFUL,
} from '../../util/constant';

export default () => {
  const productRouter = new Router({ mergeParams: true });

  productRouter.get('/', async (req, res) => {
    try {
      const response = await ProductService.getAllProducts();
      res.status(HttpStatus.OK)
        .send(createSuccessResponse(response, PRODUCTS_FETCHING_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_FETCHING_PRODUCTS);
    }
  });

  productRouter.get('/:product_id', async (req, res) => {
    try {
      const productId = req.params.product_id;
      const response = await ProductService.getProductById(productId);
      res.status(HttpStatus.OK).send(createSuccessResponse(response, PRODUCT_FETCHING_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_FETCHING_PRODUCT);
    }
  });

  productRouter.post('/', async (req, res) => {
    try {
      const request = req.body;
      const response = await ProductService.createProduct(request);
      res.status(HttpStatus.OK).send(createSuccessResponse(response, PRODUCT_CREATE_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_CREATING_PRODUCT);
    }
  });

  productRouter.post('/bulk-create', async (req, res) => {
    try {
      const request = req.body;
      const response = await ProductService.loadProductsFromFile(request);
      res.status(HttpStatus.OK).send(createSuccessResponse(response, BUCK_CREATE_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_BULK_CREATE);
    }
  });

  productRouter.patch('/:product_id', async (req, res) => {
    try {
      const request = req.body;
      request.productId = req.params.product_id;
      const response = await ProductService.updateProduct(request);
      res.setHeader('Content-Type', 'application/json');
      res.status(HttpStatus.OK)
        .send(createSuccessResponse(response, PRODUCT_UPDATE_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_UPDATING_PRODUCT);
    }
  });

  productRouter.delete('/:product_id', async (req, res) => {
    try {
      const productId = req.params.product_id;
      const response = await ProductService.deleteProduct(productId);
      res.status(HttpStatus.OK).send(createSuccessResponse(response, PRODUCT_DELETE_SUCCESSFUL));
    } catch (error) {
      return sendErrorResponse(res, error, ERROR_DELETING_PRODUCT);
    }
  });

  return productRouter;
};
