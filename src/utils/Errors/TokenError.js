import { BaseError } from './BaseError.js';
import { ERROR_TYPE, STATUS_CODE } from '../httpStatus.js';

export class TokenError extends BaseError {
  constructor(
    message,
    statusCode = STATUS_CODE.UNAUTHORIZED,
    type = 'token_error'
  ) {
    super(message, statusCode, type);
  }
}
