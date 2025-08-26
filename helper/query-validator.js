const Joi = require("joi");

const jobsQueryValidation = Joi.object({
  status: Joi.string()
    .valid("pending", "interview", "declined")
    .messages({
      "string.base": "Status must be a string.",
      "any.only": "Status must be one of: pending, interview, declined.",
    }),
  
  company: Joi.string()
    .trim()
    .messages({
      "string.base": "Company must be a string.",
    }),

  position: Joi.string()
    .trim()
    .messages({
      "string.base": "Position must be a string.",
    }),

  sort: Joi.string()
    .pattern(/^[-\w,]+$/)
    .messages({
      "string.pattern.base": "Sort can only include letters, numbers, dash(-), and commas.",
    }),
  page: Joi.number().integer().min(1).default(1)
    .messages({
      "number.base": "Page must be a number.",
      "number.integer": "Page must be an integer.",
      "number.min": "Page must be at least 1."
    }),

  limit: Joi.number().integer().min(1).max(100).default(10)
    .messages({
      "number.base": "Limit must be a number.",
      "number.integer": "Limit must be an integer.",
      "number.min": "Limit must be at least 1.",
      "number.max": "Limit cannot exceed 100."
    }),

}).unknown(false);

module.exports = { jobsQueryValidation };
