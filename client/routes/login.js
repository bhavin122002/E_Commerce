const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUsers,
  getAllAdmin,
} = require("../controllers/login");

/* --------------------------------------------------  getall Admin  -------------------------------------------------- */
router.get("/getalladmin", getAllAdmin.controller);

/* --------------------------------------------------  get Single Admin  -------------------------------------------------- */
router.get("/loginadmin", getSingleUsers.controller);

/* --------------------------------------------------  get Single Register  -------------------------------------------------- */
router.get("/registeradmin", getAllUsers.controller);

module.exports = router;
