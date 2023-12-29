const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { signUp, getUsers, logIn } = require("../controllers/userController");

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.get("/getusers", protect, getUsers);

module.exports = router;
