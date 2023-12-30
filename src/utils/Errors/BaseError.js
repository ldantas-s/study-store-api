export class BaseError extends Error {
  constructor(message, statusCode, type) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.type = type;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
  serialize() {
    return { type: this.type, message: this.message };
  }
}
