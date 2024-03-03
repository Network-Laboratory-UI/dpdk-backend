const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Route for creating config
router.post("/register", userController.registerUser);
router.get(
  "/profile",
  authMiddleware.authMiddleware,
  userController.getProfile
);
router.post("/login", userController.loginUser);

module.exports = router;
