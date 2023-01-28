const express = require("express");
const { nanoid } = require("nanoid");

const router = express.Router();

// sample functionality for login authentication
router.post("/login", (req, res) => {
  try {
    if (req.body.username) {
      const loggedInUser = { id: nanoid(), username: req.body.username };
      return res.status(200).json(loggedInUser);
    }

    res.status(400).json({ error: "Invalid username provided" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
