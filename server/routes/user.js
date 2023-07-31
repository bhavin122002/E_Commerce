const express = require("express");
const router = express.Router();

const {
  Registration,
  Login,
  getAllUser,
  LogOut,
} = require("../controllers/user");

/* --------------------------------------------------  getall Admin  -------------------------------------------------- */
router.get("/getalladmin", getAllUser.controller);

/* --------------------------------------------------  get Single Login  -------------------------------------------------- */
router.post("/loginadmin", Login.controller);

/* --------------------------------------------------  get Single Register  -------------------------------------------------- */
router.post("/registeradmin", Registration.controller);

/* --------------------------------------------------  get Single Register  -------------------------------------------------- */
router.delete("/logoutadmin", LogOut.controller);

module.exports = router;
