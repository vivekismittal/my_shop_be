const { knexMyShop: db } = require("./../libraries/psql");
const userDB = db("users");

exports.insertUser =  (newUser) => {
  return userDB
    .insert(newUser)
    .returning("*")
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((e) => null);
};

exports.updateUserOTP = async (mobile, otp) => {
  const data = await userDB.where({ mobile }).update({ otp });
  return data;
};

exports.selectUser = async (mobile) => {
  try{
    const data = await userDB.select("*").where({ mobile });
    return data[0];
  }
  catch(e){
return null
  }
};
