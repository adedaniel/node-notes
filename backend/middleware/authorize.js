const authorize = (req, res, next) => {
  // Perform authorization action here

  //   res.status(401).send("Unauthorized");
  next();
};

module.exports = authorize;
