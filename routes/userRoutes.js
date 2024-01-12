const express = require("express");
const router = express.Router();
const { signUp, getUsers, logIn, Logout } = require("../controllers/userController");
const {isAuthenticated} = require('../middleware/sessionMiddleware')

router.post("/signUp", signUp);
router.post("/logIn", logIn);
router.post("/logout", Logout);
router.get("/getusers", isAuthenticated, getUsers);

module.exports = router;
