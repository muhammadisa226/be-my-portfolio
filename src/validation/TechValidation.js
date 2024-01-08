import Joi from "joi"

export const createTechnologyValidation = Joi.object({
  portfolioId: Joi.string().required().max(100).messages({
    "any.required": "Parameter portfolioId is Required",
    "string.empty": "Parameter portfolioId must be filled in",
    "string.max": "Parameter portfolioId max 100 character",
  }),
  tool_id: Joi.number().required().positive().messages({
    "any.required": "Field tool_id is Required",
    "number.base": "Field tool_id must be a number",
    "number.postive": "Field tool_id  must be a postive number",
  }),
})
export const deleteTechnologyValidation = Joi.object({
  portfolioId: Joi.string().required().max(100).messages({
    "any.required": "Parameter portfolioId is Required",
    "string.empty": "Parameter portfolioId must be filled in",
    "string.max": "Parameter portfolioId max 100 character",
  }),
  toolId: Joi.number().required().positive().messages({
    "any.required": "Parameter toolId is Required",
    "number.base": "Parameter toolId must be a number",
    "number.postive": "Parameter toolId  must be a postive number",
  }),
})
