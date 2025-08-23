const { registerValidation } = require("../models/user-model");

function validateRegister(req, res, next) {
  const { error } = registerValidation.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      details: error.details.map(err => err.message), 
    });
  }

  next(); 
}

module.exports ={validateRegister} ;
