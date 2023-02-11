const jwt = require("jsonwebtoken");
const { CustomAPIError } = require("../errors");

const authenticate = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization?.split(" ")[1],
      process.env.JWT_SECRET
    );

    const { iat, exp, ...rest } = decoded;
    req.user = rest;
    next();
  } catch (error) {
    throw new CustomAPIError(401, "Unauthenticated. Please login again.");
    // return res.status(401).json({ error: "Unauthenticated" });
  }
};

module.exports = authenticate;
