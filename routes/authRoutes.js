const express = require("express");
// const { route } = require(".");
const authController = require("./../controller/authController");
const router = express.Router();

router.post("/login", authController.userLogin,authController.sendOTP);
router.post("/verify-otp", authController.verifyOtp);

module.exports = router;
