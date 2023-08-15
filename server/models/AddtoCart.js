const mongoose = require("mongoose");

const AddtocartSchema = new mongoose.mongoose.Schema(
  {
    productID: {
      type: String,
    },
    userID: {
      type: String,
    },
    count: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addtocart", AddtocartSchema);
