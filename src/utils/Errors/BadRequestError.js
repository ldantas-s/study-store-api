import { BaseError } from './BaseError.js';
import { STATUS_CODE } from '../httpStatus.js';

export class BadRequestError extends BaseError {
  constructor(
    message,
    body,
    statusCode = STATUS_CODE.BAD_REQUEST,
    type = 'bad_request'
  ) {
    super(message, statusCode, type);
    this.body = body;
  }
}
