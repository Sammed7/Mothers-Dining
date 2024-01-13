const Menu = require('../models/menuModel')
const Cart = require('../models/cartSchema')
const asyncHandler = require("express-async-handler");

// Add items to cart
const addToCart = asyncHandler( async(req, res) => {
    try {
        const { menuItemId } = req.body
        const userId = req.session.user.userId;

        // Check if the user's cart exists, create one if not
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({ user: userId, items: [] });
        }

        // Check if the item is already in the cart
        const existingItem = cart.items.find(item => item.menuItem.equals(menuItemId));

        if (existingItem) {
            // If the item exists, increment the quantity
            existingItem.quantity += 1;
        } else {
            // If the item doesn't exist, add it to the cart
            cart.items.push({ menuItem: menuItemId });
        }

        await cart.save();
        res.json({ success: true, cart });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

// Get all items in the user's cart
const getCartItems = asyncHandler( async (req, res) => {
    try {
      const userId = req.session.user.userId; // Assuming you store the user's ID in the session
  
      const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
  
      if (!cart) {
        return res.json({ success: true, items: [] });
      }
  
      res.json({ success: true, items: cart.items });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = {
    addToCart,
    getCartItems
}