const express = require("express");
const cors = require("cors");

const app = express();

/* ✅ CORS FIX */
app.use(
  cors({
    origin: "http://localhost:3000", // frontend
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));

module.exports = app;
