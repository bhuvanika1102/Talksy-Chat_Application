const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authService = require("../services/auth.service");
const jwtConfig = require("../config/jwt");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await authService.createUser(username, email, passwordHash);

  //CREATE JWT AFTER REGISTER
  const token = jwt.sign({ id: userId, email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  res.status(201).json({
    message: "Registration successful",
    token,
  });
};

exports.login = async (req, res) => {
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

  const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });

  res.status(200).json({
    message: "Login successful",
    token,
  });
};
