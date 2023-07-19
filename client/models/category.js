const mongoose = require("mongoose");

const categorySchema = new mongoose.mongoose.Schema(
  {
    categoryName: {
      type: String,
      require: true,
    },
    categoryImage: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", categorySchema);
