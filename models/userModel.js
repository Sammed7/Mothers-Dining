const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
    maxlength: [50, "name should be less than 50 characters"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please enter correct email"],
  },
  phone:{
    type: Number,
    required: true,
    validate: {
      validator: (value) => value.toString().length === 10, // Enforce exactly 10 characters
      message: 'Phone number must be exactly 10 characters long',
    },
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

module.exports = mongoose.model("user", userSchema);
