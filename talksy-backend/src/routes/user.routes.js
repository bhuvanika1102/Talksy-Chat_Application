const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const { setupProfile, getProfile } = require("../controllers/user.controller");

const upload = multer({ dest: "uploads/" });

router.post(
  "/profile-setup",
  authMiddleware,
  upload.single("avatar"),
  setupProfile
);

router.get("/profile", authMiddleware, getProfile);

module.exports = router;
