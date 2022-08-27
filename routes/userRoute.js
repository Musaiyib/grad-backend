const express = require("express");
const router = express.Router();
const {
  handleNewUser,
  getUsers,
  updateUser,
  deleteUser,
  login,
  getMe,
} = require("../controllers/userController");
const { requireAuth } = require("../middleware/authMiddleware");

// get/login user
router.route("/").get(requireAuth, getMe).post(login);

router.route("/allusers").get(requireAuth, getUsers);
// registering user
router.route("/register").post(handleNewUser);

// modifying/deleting
router
  .route("/:id")
  .put(requireAuth, updateUser)
  .delete(requireAuth, deleteUser);
module.exports = router;
