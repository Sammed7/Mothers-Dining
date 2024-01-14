const mongoose = require("mongoose");
const validator = require("validator");

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name."],
    trim: true,
  },
  img_url: {
    type: String,
    required: [true, "Please add image url."],
  },
  category: {
    type: String,
    required: [true, "Please enter category."],
  },
  sub_category: {
    type: String,
    required: [true, "Please enter sub category."],
  },
  content: {
    type: String,
    required: [true, "Please Add content for menu."],
  },
  price: {
    type: Number,
    required: [true, "Please enter Price."],
  },
  rating: {
    type: Number,
  },
  TotalRating: {
    type: Number,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
