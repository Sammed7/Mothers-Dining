const express = require("express");
const router = express.Router();
const { addToCart, getCartItems, placeOrder, orderHistoty } = require('../controllers/cartController')

router.post("/cart", addToCart)
router.get("/cart", getCartItems)
router.post("/cart/placeorder", placeOrder)
router.get("/cart/orderHistoty", orderHistoty)


module.exports = router;