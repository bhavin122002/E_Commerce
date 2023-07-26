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
router.post("/loginadmin", getSingleUsers.controller);

/* --------------------------------------------------  get Single Register  -------------------------------------------------- */
router.post("/registeradmin", getAllUsers.controller);

module.exports = router;
