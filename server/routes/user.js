const express = require("express");
const router = express.Router();

const {
  Registration,
  Login,
  getAllUser,
  LogOut,
} = require("../controllers/user");

/* --------------------------------------------------  get All Admin  -------------------------------------------------- */
router.get("/getalladmin", getAllUser.controller);

/* --------------------------------------------------  Single Login  -------------------------------------------------- */
router.post("/loginadmin", Login.controller);

/* --------------------------------------------------  Single Register  -------------------------------------------------- */
router.post("/registeradmin", Registration.controller);

/* --------------------------------------------------  Single Logout  -------------------------------------------------- */
router.delete("/logoutadmin/:id", LogOut.controller);

module.exports = router;
