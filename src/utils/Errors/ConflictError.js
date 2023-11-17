import { BaseError } from './BaseError.js';
import { STATUS_CODE } from '../httpStatus.js';

export class ConflictError extends BaseError {
  constructor(message, statusCode = STATUS_CODE.CONFLICT, type = 'conflict') {
    super(message, statusCode, type);
  }
}
