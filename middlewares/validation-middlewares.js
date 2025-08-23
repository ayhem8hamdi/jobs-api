const { registerValidation } = require("../models/user-model");
const {userModel}= require("../models/user-model");

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

module.exports ={validateRegister} ;
