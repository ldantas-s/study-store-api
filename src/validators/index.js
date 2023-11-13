export class ValidationContract {
  _errors = [];

  hasMinLen(value, minLength, message) {
    if (value.length <= minLength) this._errors.push(message);
  }

  isEmail(value, message) {
    const emailFormatValid = /[\D|\d]+@[\D|\d]+\.[\D|\d]{2,3}/;
    if (!emailFormatValid.test(value)) this._errors.push(message);
  }

  errors() {
    return this._errors;
  }

  isValid() {
    return this._errors.length === 0;
  }
}
