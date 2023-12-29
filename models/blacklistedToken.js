const mongoose = require("mongoose");

const blacklistedTokenSchema = new mongoose.Schema({
  token: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("BlacklistedToken", blacklistedTokenSchema);
