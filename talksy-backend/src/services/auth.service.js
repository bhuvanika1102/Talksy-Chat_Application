const db = require("../config/db");

exports.findUserByEmail = async (email) => {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0];
};

exports.createUser = async (username, email, passwordHash) => {
  const res = await db.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
    [username, email, passwordHash]
  );
  return res.rows[0].id;
};
