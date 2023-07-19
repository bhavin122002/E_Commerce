const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsBraceletsbangles,
} = require("../controllers/braceletsbangles");

router.route("/").get(getAllProducts);
router.route("/braceletsbangles").get(getAllProductsBraceletsbangles);

module.exports = router;
