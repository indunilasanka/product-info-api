import HttpStatus from 'http-status-codes';
import InvalidRequestException from '../exception/InvalidRequestException';

export function createSuccessResponse(data, message) {
  if (data === undefined && message === undefined) throw new Error('"data" or "message" must be defined when calling createSuccessResponse.');
  return {
    status: 'success',
    message,
    data: data && data.data
      ? data.data
      : (data) || {},
  };
}

export function createErrorResponse(error, message, data) {
  const json = {
    status: 'error',
  };

  if (message) {
    json.message = message;
  } else if (error.message) {
    json.message = error.message;
  }

  if (data) {
    json.data = data;
  } else if (error.data) {
    json.data = error.data;
  }

  return json;
}

export function sendErrorResponse(res, error, message, data) {
  const json = {
    status: 'error',
  };

  json.message = message;

  if (data) {
    json.data = data;
  } else if (error.data) {
    json.data = error.data;
  }

  if (error instanceof InvalidRequestException) {
    if (error.message) {
      json.message = error.message;
    }
    if (error.code) {
      json.code = error.code;
    }
    res.status(HttpStatus.BAD_REQUEST).send(json);
  } else {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(json);
  }
}
