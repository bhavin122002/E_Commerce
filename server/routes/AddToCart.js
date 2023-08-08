const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded());

const {
  Addaddtocart,
  UpdateAddtocart,
  DeleteAddtocart,
  getAllAddtocart,
  getAddtocart,
} = require("../controllers/AddToCart");

/* ------------------------   getall category  ------------------------ */
router.get("/getall-addtocart", getAllAddtocart.controller);

/* ------------------------  get category  ------------------------ */
router.get("/get-addtocart", getAddtocart.controller);

/* ------------------------  post category  ------------------------ */
router.post("/add-addtocart/:productID", Addaddtocart.controller);

/* ------------------------  update category  ------------------------ */
router.post("/update-addtocart/:id", UpdateAddtocart.controller);

/* ------------------------  delete category  ------------------------ */
router.delete("/delete-addtocart/:id", DeleteAddtocart.controller);

module.exports = router;
