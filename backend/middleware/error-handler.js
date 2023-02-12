const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.info) {
    const infoToString = Object.values(err.info).join(", ");
    err.message = err.message + ": " + infoToString;
  }

  return res
    .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message || "Something went wrong, please try again" });
};

module.exports = errorHandlerMiddleware;
