import Joi from "joi"
export const EducationIdValidation = Joi.string().required().messages({
  "any.required": "Parameter id is Required",
  "string.empty": "Parameter id must be filled in",
})
export const createEduValidation = Joi.object({
  title: Joi.string().required().max(100).messages({
    "any.required": "Field title is Required",
    "string.empty": "Field title must be filled in",
    "string.max": "Field title max 100 character",
  }),
  year: Joi.string().required().max(100).messages({
    "any.required": "Field year is Required",
    "string.empty": "Field year must be filled in",
    "string.max": "Field year max 100 character",
  }),
  details: Joi.string().optional().max(255).messages({
    "string.max": "Field details max 255 character",
  }),
})
export const updateEduValidation = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Parameter id is Required",
    "string.empty": "Parameter id must be filled in",
  }),
  title: Joi.string().required().max(100).messages({
    "any.required": "Field title is Required",
    "string.empty": "Field title must be filled in",
    "string.max": "Field title max 100 character",
  }),
  year: Joi.string().required().max(100).messages({
    "any.required": "Field year is Required",
    "string.empty": "Field year must be filled in",
    "string.max": "Field year max 100 character",
  }),
  details: Joi.string().optional().max(255).messages({
    "string.max": "Field details max 255 character",
  }),
})
