const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

//  All the routes related to Menu are present here.

/*
 This handler handles creating menu items in db.
 send POST Request at /api/menu
*/
const createMenuItem = asyncHandler(async (req, res) => {
  try {
    const { name, category, content, price, rating, TotalRating } = req.body;

    if (!name || !category || !content || !price) {
      console.log(name, category, content, price, rating, TotalRating);
      return res.status(400).json({ status: "fail", message: "Missing required fields" });
    }

    const menuItem = await Menu.create(req.body);
    res.status(201).json({ status: "success", data: menuItem });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
});

/*
 This handler Gives list Of menu items present in db.
 send GET Request at /api/menu
*/
const getAllMenuItems = asyncHandler(async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({ status: "success", data: menuItems });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

/*
 This handler Gives list 0f category menu items present in db.
 send GET Request at /api/menu/:category
*/
const getMenuItemsBycategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  try {
    const menuItems = await Menu.find({ category });
    res.status(200).json({ status: "success", data: menuItems });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
});

module.exports = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemsBycategory,
};
