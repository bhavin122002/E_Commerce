const mongoose = require("mongoose");

const AddtocartSchema = new mongoose.mongoose.Schema(
  {
    productID: {
      type: String,
    },
    userID: {
      type: String,
    },
    productName: {
      type: String,
      require: true,
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
    // qty: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addtocart", AddtocartSchema);
