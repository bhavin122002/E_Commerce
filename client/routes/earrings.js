const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsEarring,
} = require("../controllers/earrings");

router.route("/").get(getAllProducts);
router.route("/earrings").get(getAllProductsEarring);

module.exports = router;
