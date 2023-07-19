const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsHoopearrings,
} = require("../controllers/hoopearrings");

router.route("/").get(getAllProducts);
router.route("/hoopearrings").get(getAllProductsHoopearrings);

module.exports = router;
