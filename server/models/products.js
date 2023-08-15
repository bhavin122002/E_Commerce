const mongoose = require("mongoose");

const ProductSchema = new mongoose.mongoose.Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    productImage: {
      type: String,
    },
    productPrice: {
      type: Number,
      require: true,
    },
    productSize: {
      type: String,
      require: true,
    },
    productMetal: {
      type: String,
      require: true,
    },
    dummyPrice: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    productDescription: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
