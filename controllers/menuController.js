const Menu = require("../models/menuModel");
const asyncHandler = require("express-async-handler");

//  All the routes related to Menu are present here.

/*
 This handler handles creating menu items in db.
 only Admin can access this API
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
 This handler handles delete menu items in db.
 only Admin can access this API
 send delete Request at /api/menu
*/
const deleteMenuItem = asyncHandler(async (req, res) => {

  try {
    const { menuItemId } = req.params;
    const item = await Menu.findById( menuItemId )
    if(!item){
      res.status(400)
      throw new Error('Item not present in your list, Please check your ID again')
    }

    await item.deleteOne()
    res.status(200).json({message: "Item deleted successfully."})

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
  deleteMenuItem
};
