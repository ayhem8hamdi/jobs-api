const asyncHandler = require("express-async-handler");
const {userModel}= require("../models/user-model");

const register = asyncHandler(
   async (req,res,next)=>{
        const searchedUser=await userModel.findOne({email :req.body.email});
        if (searchedUser) {
           return res.status(400).json({message:"User with this email already existed"});
        }
       const newUser= await userModel.create(req.body);
       if (!newUser) {
        res.status(500).json({statusCode:500,message:"there was something wrong try again later"});
       } 
    const jwt=newUser.generateToken();
  const { password, ...others } = newUser.toObject();
    res.status(201).json({...others , token:jwt});
    }
    
);

const login = asyncHandler(
    (req,res,next)=>{
        res.send("fake login");
    }
);


module.exports = {register,login}