const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Profile access granted",
    user: req.user,
  });
});

module.exports = router;
