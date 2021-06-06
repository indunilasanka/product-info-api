import HttpStatus from 'http-status-codes';
import ApiException from '../exception/ApiException';
import { createErrorResponse } from './responseGenerator';
import logger from '../util/logger';

export default function errorHandler() {
  return (err, req, res, next) => {
    if (err instanceof ApiException) {
      const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      const errorResponse = createErrorResponse(err);
      logger.error(JSON.stringify(errorResponse));
      return res.status(statusCode).send(errorResponse);
    }
    if (err instanceof Error) {
      const errorInformation = {};
      errorInformation.error = err.toString();
      if (err.stack !== undefined) errorInformation.stack = err.stack;
      if (err.code !== undefined) errorInformation.code = err.code;
      if (err.path !== undefined) errorInformation.path = err.path;
      if (err.causes !== undefined) errorInformation.causes = err.causes;
      const errorResponse = createErrorResponse(err, 'Internal server error');
      logger.error(JSON.stringify(errorResponse));
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorResponse);
    }
    return next(err);
  };
}
