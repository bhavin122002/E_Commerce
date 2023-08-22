const mongoose = require("mongoose");

const AddtocartSchema = new mongoose.mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
    },
    productAddToCart: [
      {
        productID: {
          type: mongoose.Types.ObjectId,
        },
        count: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("addtocart", AddtocartSchema);
