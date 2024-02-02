const express = require("express");
const router = express.Router();
const { isAdmin } = require('../middleware/adminRights')

const {
  createMenuItem,
  getAllMenuItems,
  getMenuItemsBycategory,
  deleteMenuItem,
} = require("../controllers/menuController");

router.post("/menu",isAdmin, createMenuItem);
router.delete("/menu/:menuItemId",isAdmin, deleteMenuItem);
router.get("/menu", getAllMenuItems);
router.get("/menu/:category", getMenuItemsBycategory);

module.exports = router;
