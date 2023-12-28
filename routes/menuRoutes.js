const express = require("express");
const router = express.Router();
const {
  createMenuItem,
  getAllMenuItems,
  getMenuItemsBycategory,
} = require("../controllers/menuController");

router.post("/menu", createMenuItem);
router.get("/menu", getAllMenuItems);
router.get("/menu/:category", getMenuItemsBycategory);

module.exports = router;
