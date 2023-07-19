const mongoose = require("mongoose");

const BraceletsbanglesSchema = new mongoose.mongoose.Schema({
  img_url: {
    type: String,
  },
  product_title: {
    type: String,
  },
  product_price: {
    type: Number,
    required: [true, "Price must be Provided"],
  },
  dummy_price: {
    type: Number,
    required: [true, "Dummy Price must be Provided"],
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  rating_count: {
    type: Number,
  },
  product_description: {
    type: String,
    required: [true, "Product Description must be Provided"],
  },
  Metal: {
    type: String,
  },
  Size: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Braceletsbangle", BraceletsbanglesSchema);
