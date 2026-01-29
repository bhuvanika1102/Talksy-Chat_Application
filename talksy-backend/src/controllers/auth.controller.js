const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authService = require("../services/auth.service");
const jwtConfig = require("../config/jwt");
const transporter = require("../config/mail");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const userId = await authService.createUser(username, email, passwordHash);

    // ✅ CREATE JWT AFTER REGISTER
    const token = jwt.sign(
      { id: userId, email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await authService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= FORGOT PASSWORD ================= */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) {
      // security: don’t reveal email existence
      return res.json({ message: "If email exists, reset link sent" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await authService.saveResetToken(user.id, resetToken, expiry);

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    // TEMP (later send email)
    console.log("RESET LINK:", resetLink);
    const transporter = require("../config/mail");
    console.log("Transporter type:", typeof transporter);
    console.log("sendMail exists:", typeof transporter.sendMail);
    await transporter.sendMail({
      from: `"Talksy Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your Talksy password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });
    
    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= RESET PASSWORD ================= */
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: "Token and password required" });
    }

    const user = await authService.findUserByResetToken(token);

    if (!user || new Date(user.reset_token_expiry) < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authService.updatePassword(user.id, hashedPassword);
    await authService.clearResetToken(user.id);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
