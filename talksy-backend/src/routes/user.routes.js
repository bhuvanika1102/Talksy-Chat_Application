const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload"); // multer config

router.post(
  "/profile-setup",
  authMiddleware,
  upload.single("avatar"),
  userController.setupProfile
);

router.get(
  "/profile",
  authMiddleware,
  userController.getProfile
);

module.exports = router;
