const asyncHandler = require("express-async-handler");


const register = asyncHandler(
    (req,res,next)=>{
        res.send("fake register");
    }
);

const login = asyncHandler(
    (req,res,next)=>{
        res.send("fake login");
    }
);


module.exports = {register,login}