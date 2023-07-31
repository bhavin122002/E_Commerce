const express = require("express");
const router = express.Router();

const {
  Registration,
  Login,
  getAllUser,
} = require("../controllers/user");

/* --------------------------------------------------  getall Admin  -------------------------------------------------- */
router.get("/getalladmin", getAllUser.controller);

/* --------------------------------------------------  get Single Admin  -------------------------------------------------- */
router.post("/loginadmin", Login.controller);

/* --------------------------------------------------  get Single Register  -------------------------------------------------- */
router.post("/registeradmin", Registration.controller);

module.exports = router;
