module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: "1d", // token valid for 1 day
  algorithm: "HS256",
};
