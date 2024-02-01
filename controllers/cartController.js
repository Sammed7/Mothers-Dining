const Menu = require('../models/menuModel')
const Cart = require('../models/cartModel')
const asyncHandler = require("express-async-handler");
const OrderHistory = require('../models/orderHistoryModel');


class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

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
        res.status(500)
        throw new Error('Internal Server Error, Please try to log in')
    }
})

// Get all items in the user's cart
const getCartItems = asyncHandler( async (req, res) => {
    try {
      const userId = req.session.user.userId; // Assuming you store the user's ID in the session
  
      const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
  
      if (!cart) {
        return res.json({ success: true, items: [], totalCartValue: 0 });
      }

      // Calculate total value for each item using the virtual property
        const itemsWithTotalValue = cart.items.map(item => ({
            menuItem: item.menuItem.name,
            quantity: item.quantity,
            price:item.menuItem.price,
            totalPrice: item.menuItem.price * item.quantity,
            _id: item._id,  
        }));
    
    // Calculate total sum of all items in the cart
    const totalCartValue = cart.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);    
  
    res.json({ success: true, items: itemsWithTotalValue, totalCartValue });
    } 
    catch (error) {
        res.status(500)
        throw new Error('Please login to check items in your cart.')
    }
});

const placeOrder = asyncHandler( async (req, res) => {
    const userId = req.session.user.userId

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.menuItem');
        console.log("cart.length", cart.items.length)

        if(cart.items.length == 0) {
            res.status(400)
            throw new CustomError('There is no items in your cart.')
        }

        const itemsWithTotalValue = cart.items.map(item => ({
            menuItem: item.menuItem.name,
            quantity: item.quantity,
            price:item.menuItem.price,
            totalPrice: item.menuItem.price * item.quantity,
        }));

        // Add items in order history
        const order = new OrderHistory({
            user: userId,
            items: itemsWithTotalValue
        })

        await order.save()

        // Remove cart items
        await Cart.findOneAndUpdate({ user: userId }, {$set: {items: [] } });

        res.status(200).json({
            status: "success",
            message: "Order placed successfully."
        })
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400)
            throw new Error(error.message);
        } else {
            res.status(400)
            throw new Error(error.message);
        }
    }
})

const orderHistoty = asyncHandler( async(req, res)=> {
    const userId = req.session.user.userId

    
    const orderHistory = await OrderHistory.find({ user: userId }).sort({ createdAt: -1 });
    console.log("orderHistory", orderHistory)

    if(orderHistory.length == 0) {
        res.status(500)
        throw new Error('opps! no order history availale.')
    }
    
    res.status(200).json(orderHistory);
})

module.exports = {
    addToCart,
    getCartItems,
    placeOrder,
    orderHistoty
}