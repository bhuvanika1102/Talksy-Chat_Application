const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.register = async (req, res) => {
  res.status(200).json({ message: "Register works" });
};

exports.login = async (req, res) => {
  res.status(200).json({ message: "Login works" });
};
