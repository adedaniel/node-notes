const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class CustomAPIError extends Error {
  constructor(statusCode, message) {
    super(statusCode, message);
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.message = message || getReasonPhrase(this.statusCode);
  }
}

module.exports = CustomAPIError;
