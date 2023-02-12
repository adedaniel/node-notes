const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { CustomAPIError } = require("../errors");

const authenticate = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    );

    const { iat, exp, ...rest } = decoded;

    // Fetching the user and passing it into the req.user is slower by ~100ms on
    // a good day. Hence it was commented out.
    // const user = await User.findById(rest.id).select("-password");

    req.user = rest;
    next();
  } catch (error) {
    throw new CustomAPIError(401, "Unauthenticated. Please login again.");
  }
};

module.exports = authenticate;
