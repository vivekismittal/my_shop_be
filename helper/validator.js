const constants = require("./../utils/constants");
exports.isMobileValid = (mobile) => {
  return  String(mobile).match(constants.regexForMobile);
};
