const {createJobValidation,updateJobValidation}= require("../models/job-model");
const {jobsQueryValidation} = require("../helper/query-validator");


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



async function updateJobValidator(req,res,next) {
        const { error } = updateJobValidation.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Validation failed",
      details: error.details.map(err => err.message), 
    });
  }
next();
}



const validateJobsQuery = (req, res, next) => {
  const { error } = jobsQueryValidation.validate(req.query, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "Invalid query parameters",
      details: error.details.map(err => err.message),
    });
  }
  next();
};

module.exports = {addJobValidation,updateJobValidator,validateJobsQuery}
