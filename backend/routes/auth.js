const express = require("express");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const { CustomAPIError } = require("../errors");

const router = express.Router();

// sample functionality for login authentication
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError(400, "Invalid email or password provided");
  }

  const token = jwt.sign({ id: nanoid(), email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const loggedInUser = { id: nanoid(), email };
  return res.status(200).json({ user: loggedInUser, token });
});

module.exports = router;
