const express= require("express");
const router= express.Router();
const {login,register}= require("../controllers/auth-controller");
const {validateRegister}=require("../middlewares/validation-middlewares");

router.route("/register").post(validateRegister,register);
router.route("/login").post(login);


module.exports= router;