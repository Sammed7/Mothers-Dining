const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// signUp user and save the details
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password, phone, role, adminKey} = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400)
    throw new Error('please enter all the required fields.')
  }

  // check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }

  if(role == "admin" && adminKey !== process.env.admin_secret_key){
    res.status(400)
    throw new Error('Invalid admin key.')
  }

  // hash the password with 10 digit
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role
  });

  if (user) {
    res.status(200).json({
      status: "success",
      _id: user.id,
      name: user.name,
      email: user.email,
      phone:user.phone,
      role: user.role
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
      message: "User not found, Please check credentials.",
    });
  }
  const DBpassword = await user.password;

  if (user && (await bcrypt.compare(password, DBpassword))) {

    req.session.user = {
      userId: user._id,
      userRole: user.role
    };
    console.log("req.session.user", req.session.user)

    res.status(200).json({
      status: "success",
      userId: user._id,
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
  const user = await User.findById( id );
  res.status(200).json({
    Status: "success",
    name: user.name,
    email: user.email,
    phone: user.phone
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
        res.status(500)
        throw new Error('Internal Server Error')
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    res.status(200).json('Logged out successfully');
  });
})

module.exports = {
  signUp,
  getUserProfile,
  logIn,
  Logout
};
