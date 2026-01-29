const db = require("../config/db");

const findUserByEmail = async (email) => {
  const res = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return res.rows[0];
};

const createUser = async (username, email, passwordHash) => {
  const res = await db.query(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
    [username, email, passwordHash]
  );
  return res.rows[0].id;
};

const saveResetToken = async (userId, token, expiry) => {
  await db.query(
    "UPDATE users SET reset_token=$1, reset_token_expiry=$2 WHERE id=$3",
    [token, expiry, userId]
  );
};

const findUserByResetToken = async (token) => {
  const res = await db.query(
    "SELECT * FROM users WHERE reset_token=$1",
    [token]
  );
  return res.rows[0];
};

const updatePassword = async (userId, passwordHash) => {
  await db.query(
    "UPDATE users SET password_hash=$1 WHERE id=$2",
    [passwordHash, userId]
  );
};

const clearResetToken = async (userId) => {
  await db.query(
    "UPDATE users SET reset_token=NULL, reset_token_expiry=NULL WHERE id=$1",
    [userId]
  );
};

module.exports = {
  findUserByEmail,
  createUser,
  saveResetToken,
  findUserByResetToken,
  updatePassword,
  clearResetToken,
};
