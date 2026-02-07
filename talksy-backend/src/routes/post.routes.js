const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");
const {
  getFeed,
  createPost,
} = require("../controllers/post.controller");

router.get("/feed", authMiddleware, getFeed);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createPost
);

module.exports = router;
