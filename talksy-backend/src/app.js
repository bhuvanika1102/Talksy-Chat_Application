const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/uploads", express.static("uploads"));

module.exports = app;
