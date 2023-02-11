const express = require("express");
const { loginUser, registerUser } = require("../controllers/auth");

const router = express.Router();

// sample functionality for login authentication
router.post("/login", loginUser);
router.post("/register", registerUser);

module.exports = router;
