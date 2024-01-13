const express = require("express");
const router = express.Router();
const { addToCart, getCartItems } = require('../controllers/cartController')

router.post("/cart", addToCart)
router.get("/cart", getCartItems)

module.exports = router;