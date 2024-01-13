const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// signUp user and save the details
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, confirm_password, phone } = req.body;

  if (!name || !email || !password || !confirm_password || !phone) {
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
    phone
  });

  if (user) {
    res.status(200).json({
      status: "success",
      _id: user.id,
      name: user.name,
      email: user.email,
      phone:user.phone,
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

  if (!user) {
    res.status(400).json({
      message: "User not found",
    });
  }
  const DBpassword = await user.password;

  if (user && (await bcrypt.compare(password, DBpassword))) {

    req.session.user = {
      userId: user._id,
      // other user details
    };
    console.log("req.session.user", req.session.user)

    res.status(200).json({
      Status: "success",
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({
      Status: "Failed",
      message: "Invalid credentials",
    });
  }
});

/*
 getUserProfile
 This handler gives current user information.
 send POST Request at /api/getUserProfile
*/
const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.session.user.userId;
  const users = await User.findById( id );
  res.status(200).json({
    users,
  });
});


/*
 logout api
 This handler logs out the current logged in user.
 send POST Request at /api/logout
*/
const Logout = asyncHandler(async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json('Logged out successfully');
  });
})

module.exports = {
  signUp,
  getUserProfile,
  logIn,
  Logout
};
