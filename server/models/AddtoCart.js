const mongoose = require("mongoose");

const AddtocartSchema = new mongoose.mongoose.Schema(
  {
    userID: {
      type: String,
    },
    productAddToCart: [
      {
        productID: {
          type: String,
        },
        count: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("addtocart", AddtocartSchema);
