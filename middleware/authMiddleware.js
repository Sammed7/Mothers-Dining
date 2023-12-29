const express = require("express");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const BlacklistedToken = require("../models/blacklistedToken");

class CustomError1 extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      console.log("First token print - ", token);

      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      if (error instanceof CustomError1) {
        console.log("inside first try CustomError1");
        res.status(error.statusCode).json({ error: error.message });
      } else {
        if (error == "TokenExpiredError: jwt expired") {
          console.log("catch error", error);
          res.status(401);
          throw new Error(
            "Not Authorized, session expired please try to log in again"
          );
        } else {
          console.log("catch error", error);
          res.status(401);
          throw new Error("Not Authorized, Something went wrong");
        }
      }
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No Token");
  }
});

module.exports = { protect };
