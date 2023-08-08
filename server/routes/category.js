const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

const {
  AddCategory,
  UpdateCategory,
  DeleteCategory,
  getAllCategory,
  getCategory,
} = require("../controllers/category");
const { upload } = require("../helper/imageUpload");

/* ------------------------   getall category  ------------------------ */
router.get(
  "/getall-category",
  getAllCategory.controller
);

/* ------------------------  get category  ------------------------ */
router.get(
  "/get-category",
  getCategory.controller
);

/* ------------------------  post category  ------------------------ */
router.post(
  "/add-category",
  upload.fields([{ name: "productImage" }]),
  AddCategory.controller
);

/* ------------------------  update category  ------------------------ */
router.post(
  "/update-category/:id",
  UpdateCategory.controller
);

/* ------------------------  delete category  ------------------------ */
router.delete(
  "/delete-category/:id",
  DeleteCategory.controller
);

module.exports = router;
