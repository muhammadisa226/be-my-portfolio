import Joi from "joi"
export const PortfolioIdValidation = Joi.string().required().messages({
  "any.required": "Parameter id is Required",
  "string.empty": "Parameter id must be filled in",
})
export const createPortfolioValidation = Joi.object({
  title: Joi.string().required().max(100).messages({
    "any.required": "Field title is Required",
    "string.empty": "Field title must be filled in",
    "string.max": "Field title max 100 character",
  }),
  description: Joi.string().required().max(1000).messages({
    "any.required": "Field description is Required",
    "string.empty": "Field description must be filled in",
    "string.max": "Field description max 1000 character",
  }),
  tool_id: Joi.number().positive().optional().messages({
    "number.base": "Field tool_id must be a number",
    "number.postive": "Field tool_id must be a postive number",
  }),
  link_project: Joi.string().optional().max(100).messages({
    "string.max": "Field link_Project max 100 character",
  }),
  link_demo: Joi.string().optional().max(100).messages({
    "string.max": "Field link_demo max 100 character",
  }),
})
export const updatePortfolioValidation = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Parameter id is Required",
    "string.empty": "Parameter id must be filled in",
  }),
  title: Joi.string().required().max(100).messages({
    "any.required": "Field title is Required",
    "string.empty": "Field title must be filled in",
    "string.max": "Field title max 100 character",
  }),
  description: Joi.string().optional().max(1000).messages({
    "string.empty": "Field description must be filled in",
    "string.max": "Field description max 1000 character",
  }),
  link_project: Joi.string().optional().max(100).messages({
    "string.max": "Field link_Project max 100 character",
  }),
  link_demo: Joi.string().optional().max(100).messages({
    "string.max": "Field link_demo max 100 character",
  }),
})
