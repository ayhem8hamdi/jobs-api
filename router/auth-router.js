const express= require("express");
const router= express.Router();
const {login,register}= require("../controllers/auth-controller");
const {validateRegister,validateLogin}=require("../middlewares/auth-validation-middlewares");

router.route("/register").post(validateRegister,register);
router.route("/login").post(validateLogin,login);


module.exports= router;