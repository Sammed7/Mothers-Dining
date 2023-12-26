const Menu = require('../models/menuModel')
const asyncHandler = require('express-async-handler')

// Create a new menu item => api/menus
const createMenuItem = asyncHandler(async (req, res) => {
    try {
      const {name, category, content, price, rating, TotalRating} = req.body
      console.log(req.body)
      if (!name || !category || !content || !price) {
        console.log(name, category, content, price,rating, TotalRating)
        return res.status(400).json({ status: 'fail', message: 'Missing required fields' });
      }
  
      const menuItem = await Menu.create( req.body );
      res.status(201).json({ status: 'success', data: menuItem });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: err.message });
    }
});

// Get all menu items => api/menu
const getAllMenuItems = asyncHandler(async (req, res) => {
    try {
      const menuItems = await Menu.find();
      res.status(200).json({ status: 'success', data: menuItems });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err.message });
    }
});

// Get menu items by category =>  api/menu/thali
const getMenuItemsBycategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
  
    try {
      const menuItems = await Menu.find({ category });
      res.status(200).json({ status: 'success', data: menuItems });
    } catch (err) {
      res.status(500).json({ status: 'fail', message: err.message });
    }
});

module.exports = {
    createMenuItem,
    getAllMenuItems,
    getMenuItemsBycategory
}