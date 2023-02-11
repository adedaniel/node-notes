const User = require("../models/User");
const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError(400, "Invalid email or password provided");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError(401, "No user found with the given credentials");
  }

  const isPasswordCorrect = await user.verifyPassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError(400, "Incorrect credentials");
  }

  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({ user, token });
};

const registerUser = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = newUser.createJWT();

  return res.status(StatusCodes.CREATED).json({ user: newUser, token });
};

module.exports = {
  loginUser,
  registerUser,
};
