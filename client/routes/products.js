const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
const {
  getAllProduct,
  AddProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getSingleProductAddtocart,
} = require("../controllers/products");
const { upload } = require("../helper/imageUpload");

/* --------------------------------------------------  getall category  -------------------------------------------------- */
router.get(
  "/getall-product",
  getAllProduct.controller
);

/* --------------------------------------------------  getall category  -------------------------------------------------- */
router.get(
  "/productdata/:id",
  getSingleProduct.controller
);

/* --------------------------------------------------  getall category  -------------------------------------------------- */
router.get(
  "/addtocart/:id",
  getSingleProductAddtocart.controller
);

/* --------------------------------------------------  getall category  -------------------------------------------------- */
router.post(
  "/add-product",
  upload.fields([{ name: "productImage" }]),
  AddProduct.controller
);

/* --------------------------------------------------  getall category  -------------------------------------------------- */
router.post(
  "/update-product/:id",
  upload.fields([{ name: "productImage" }]),
  updateProduct.controller
);

/* --------------------------------------------------  getall category  -------------------------------------------------- */
router.delete(
  "/delete-product/:id",
  deleteProduct.controller
);

module.exports = router;
