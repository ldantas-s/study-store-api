import { BaseError } from './BaseError.js';
import { ERROR_TYPE, STATUS_CODE } from '../httpStatus.js';

export class NotFoundError extends BaseError {
  constructor(message, statusCode = STATUS_CODE.NOT_FOUND, type = 'not_found') {
    super(message, statusCode, type);
  }
}
