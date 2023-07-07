const express  = require("express");
const app = express();

const authRoutes=require("./authRoutes");
app.use("/user/auth",authRoutes);

module.exports = app;