const asyncHandler = require("express-async-handler");
const {userModel}= require("../models/user-model");




const register = asyncHandler(
   async (req,res,next)=>{
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
  async  (req,res,next)=>{
       const user=await userModel.findOne({email:req.body.email});
        const jwt=user.generateToken();
        const { password, ...others } = user.toObject();
        res.status(200).json({...others , token:jwt});

    }
);


module.exports = {register,login}