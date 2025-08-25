const mongoose = require("mongoose");
const Joi = require("joi");


const jobSchema =new mongoose.Schema({
    company : {
        type:String,
        required:true,
        trim:true
    },
    position : {
        type:String,
        required:true,
        trim:true
    },
    status : {
        type:String,
        enum:['interview','pending','declined'],
        default:'pending'
    },
    createdBy : {
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true,
    },

},{timestamps:true});



// Validation for creating a job (all required)
const createJobValidation = Joi.object({
  company: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Company name is required",
      "any.required": "Company name is required",
    }),
  position: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Position is required",
      "any.required": "Position is required",
    }),
  status: Joi.string()
    .valid("interview", "pending", "declined")
    .default("pending")
    .messages({
      "any.only": "Status must be one of 'interview', 'pending', 'declined'",
    }),

}).unknown(false).required() 
.messages({
  "any.required": "Request body cannot be empty"
});



// Validation for updating a job (all optional)
const updateJobValidation = Joi.object({
  company: Joi.string()
    .trim()
    .messages({
      "string.empty": "Company name cannot be empty",
    }),
  position: Joi.string()
    .trim()
    .messages({
      "string.empty": "Position cannot be empty",
    }),
  status: Joi.string()
    .valid("interview", "pending", "declined")
    .messages({
      "any.only": "Status must be one of 'interview', 'pending', 'declined'",
    }),
}).min(1).unknown(false).required(); 


// job model 
const jobsModel = mongoose.model('Job',jobSchema);

module.exports= {createJobValidation,updateJobValidation,jobsModel}