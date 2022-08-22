const express = require("express");
const router = express.Router();
const {
  handleNewUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/userController");

router.get("/", getUsers);

router.post("/", login);
router.post("/register", handleNewUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
