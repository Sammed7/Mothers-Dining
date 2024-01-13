// models/cart.js

const mongoose = require('mongoose');
const user = require('./userModel');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',  // Assuming you have a User model for authentication
    required: true,
  },
  items: [
    {
      menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);
