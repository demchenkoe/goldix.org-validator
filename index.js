const validate = require("validate.js");
validate.Promise = Promise;

class ValidationErrors extends Error {
  constructor(errors, options, attributes, constraints) {
    super('Invalid parameters');
    Error.captureStackTrace(this, this.constructor);
    this.errors = errors;
    this.options = options;
    this.attributes = attributes;
    this.constraints = constraints;
  }
}

class Validator {}

Validator.validate = (attributes, constraints, options) => {
  return validate.async(attributes, constraints, options)
    .catch(errors => {
      return Promise.reject(new ValidationErrors(errors, options, attributes, constraints));
    });
};

Validator.extend = (validatorName, fn) => {
  validate.validators[validatorName] = fn;
};

Validator.ValidationErrors = ValidationErrors;

module.exports = { Validator: Validator, ValidationErrors };
  
