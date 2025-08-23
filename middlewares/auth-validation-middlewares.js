const { registerValidation } = require("../models/user-model");
const {userModel}= require("../models/user-model");
const {comparePasswords }= require("../helper/password-hashing");
async function validateRegister(req, res, next) {
  const { error } = registerValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      details: error.details.map(err => err.message), 
    });
  }
  const searchedUser=await userModel.findOne({email :req.body.email});
   if (searchedUser) {
       return res.status(400).json({message:"User with this email already existed"});
    }

  next(); 
}


async function validateLogin(req,res,next){
    const tempUser= userModel.findOne(req.body.email);
    if (!tempUser) {
        return res.status(404).json({status:404, message : "Email Or Password Are Incorrect"});
    }
    const isPasswordValid=comparePasswords(req.body.password,tempUser.password);
    if (!isPasswordValid) {
        return res.status(404).json({status:404, message : "Email Or Password Are Incorrect"});
    }
}

module.exports ={validateRegister,validateLogin} ;
