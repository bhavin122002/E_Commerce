const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsDrops,
} = require("../controllers/drops");

router.route("/").get(getAllProducts);
router.route("/drops").get(getAllProductsDrops);

module.exports = router;
