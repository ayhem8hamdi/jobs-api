const  Joi  = require("joi");
const mongoose = require("mongoose");
const {hashPassword}= require("../helper/password-hashing");
const jwt=require("jsonwebtoken");


// Schema 
const userSchema= new mongoose.Schema(
    {
        username : {type: String, required: true , trim: true},
        email :  {type: String, required: true , trim: true,unique:true},
        password :  {type: String, required: true , trim: true},
    },
    {timestamps: true}
);


// password hashing 
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  // If hashPassword fails, Mongoose will reject save with the error
  this.password = await hashPassword(this.password);
});

// jwt generation 
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {userId: this._id},
    process.env.JWT_SECRET_KEY
  );
};


// register validation 

const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)                
    .max(30)               
    .required()
    .trim(),

  email: Joi.string()
    .email({ tlds: { allow: false } }) 
    .required()
    .trim(),

  password: Joi.string()
    .min(6)               
    .required()
    .trim(),
}).unknown(false);

//login valdiation 

const loginValidation = Joi.object(
    {
        email: Joi.string()
    .email({ tlds: { allow: false } }) 
    .required()
    .trim(),

  password: Joi.string()
    .min(6)               
    .required()
    .trim(),  
    }
).unknown(false);


// model creation
const userModel = mongoose.model("User",userSchema);

module.exports = {userModel,registerValidation,loginValidation};