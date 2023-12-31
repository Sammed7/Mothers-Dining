const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signUp user and save the details
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, confirm_password } = req.body;

  if (!name || !email || !password || !confirm_password) {
    res.status(400).json({
      message: "please enter all the required fields.",
    });
  }

  // check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      status: "failed",
      message: "User already exists.",
    });
  }

  // check if password amd confirm password matches
  if (password !== confirm_password) {
    res.status(400).json({
      status: "failed",
      message: "Password and confirm password dosen't match.",
    });
  }

  // hash the password with 10 digit
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      status: "success",
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400).json({
      statue: "Failed",
      message: "Invalid user data.",
    });
  }
});

/*
 This handler handles user login.
 send POST Request at /api/logIn
*/
const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "please enter all the required fields.",
    });
  }

  const user = await User.findOne({ email });
  const Token = genrateToken(user._id);

  if (!user) {
    res.status(400).json({
      message: "User not found",
    });
  }
  const DBpassword = await user.password;

  if (user && (await bcrypt.compare(password, DBpassword))) {
    res.status(200).json({
      Status: "success",
      name: user.name,
      email: user.email,
      token: Token,
    });
  } else {
    res.status(400).json({
      Status: "Failed",
      message: "Invalid credentials",
    });
  }
});

/*
 This handler gives current user information.
 send POST Request at /api/logIn
*/
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    users,
  });
});

//Genrate JWT
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

module.exports = {
  signUp,
  getUsers,
  logIn,
};
