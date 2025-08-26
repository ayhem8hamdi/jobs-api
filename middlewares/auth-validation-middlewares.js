const { registerValidation,loginValidation } = require("../models/user-model");
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
       return res.status(401).json({message:"User with this email already existed"});
    }

  next(); 
}


async function validateLogin(req,res,next){
      const { error } = loginValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      details: error.details.map(err => err.message), 
    });
  }
  const tempUser = await userModel.findOne({ email: req.body.email });
    if (!tempUser) {
        return res.status(401).json({status:404, message : "Email Or Password Are Incorrect"});
    }
    const isPasswordValid=await comparePasswords(req.body.password,tempUser.password);
    if (!isPasswordValid) {
        return res.status(401).json({status:404, message : "Email Or Password Are Incorrect"});
    }
    next();
}

module.exports ={validateRegister,validateLogin} ;
