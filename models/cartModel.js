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

// Virtual property to calculate the total value for each item
cartSchema.virtual('itemsTotalValue').get(function () {
  return this.items.map(item => item.menuItem.price * item.quantity);
});

module.exports = mongoose.model('Cart', cartSchema);
