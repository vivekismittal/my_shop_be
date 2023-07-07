const userModel = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("./../helper/validator");
const constants = require("./../utils/constants");
const otpKeySecret = process.env.JWT_SECRET_FOR_OTP;
function generateOTP(x) {
  let otp = "";
  for (let i = 0; i < x; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return "0000";
  return otp;
}

exports.userLogin = async (req, res, next) => {
  const mobile = req.body.mobile;
  const name = req.body.name;

  if (!mobile) {
    res.status(422).json({
      message: "Mobile number is mandatory",
    });
    return;
  }

  if (!validator.isMobileValid(mobile)) {
    res.status(422).json({
      message: "Invalid Mobile number",
    });
    return;
  }
  console.log("1//");
  const user = await userModel.selectUser(mobile);
  console.log(`user::${user}`);
  console.log(typeof user);
  if (!user) {
    console.log("2//");
    const rowCount = await userModel.insertUser({
      mobile,
      name,
    });
    console.log(rowCount);
    if (!rowCount && !user) {
      res.status(422).json({
        message: "Something Went Wrong!",
      });
      return;
    }
  }

  return next();
};

exports.sendOTP = async (req, res, next) => {
  const mobile = req.body.mobile;
  const otp = generateOTP(constants.otpDigitsCount);
  const hashOTP = await bcrypt.hash(otp, 6);

  const updateOTPRowCount = await userModel.updateUserOTP(mobile, hashOTP);

  console.log("3//");
  console.log(updateOTPRowCount);
  if (!updateOTPRowCount) {
    console.log("4//");
    res.status(422).json({
      message: "Something Went Wrong!",
    });
    return;
  }
  const otpKey = jwt.sign({ mobile }, otpKeySecret);

  res.status(201).json({
    message: "Otp Sent Successfully",
    otpKey,
  });
};

//////////////////////////////////////////////
exports.verifyOtp = async (req, res, next) => {
  const { otp, otpKey } = req.body;
  const decoded = jwt.verify(otpKey, otpKeySecret);
  if (!decoded || !decoded.mobile) {
    res.status(422).json({
      message: "Something Went Wrong",
    });
    return;
  }
  const mobile = decoded.mobile;

  const user = (await userModel.selectUser(mobile))[0];
  if (!user) {
    res.status(422).json({
      message: "Something Went Wrong",
    });
    return;
  }
  const isOtpMatched = await bcrypt.compare(otp, user.otp);
  if (!isOtpMatched) {
    res.status(422).json({
      message: "Incorrect Otp",
    });
    return;
  }

  await userModel.updateUserOTP(user.mobile, "");
  res.status(201).json({
    message: "Otp verified",
  });
};
