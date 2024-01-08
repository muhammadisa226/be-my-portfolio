import Joi from "joi"
export const ToolsIdValidation = Joi.number().positive().required().messages({
  "any.required": "Parameter id is Required",
  "number.base": "Parameter id must be a number",
  "number.postive": "Parameter id must be a postive number",
})
export const createToolsValidation = Joi.string().required().max(100).messages({
  "any.required": "Field title is Required",
  "string.empty": "Field title must be filled in",
  "string.max": "Field title max 100 character",
})
