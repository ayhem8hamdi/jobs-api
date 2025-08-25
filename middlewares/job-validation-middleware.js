const {createJobValidation}= require("../models/job-model");



async function addJobValidation(req, res, next) {
    const { error } = createJobValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      details: error.details.map(err => err.message), 
    });
  }
  next(); 
}
module.exports = {addJobValidation}
