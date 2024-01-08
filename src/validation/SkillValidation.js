import Joi from "joi"
export const SkillIdValidation = Joi.string().required().messages({
  "any.required": "Parameter id is Required",
  "string.empty": "Parameter id must be filled in",
})
export const createSkillValidation = Joi.object({
  name: Joi.string().required().max(100).messages({
    "any.required": "Field name is Required",
    "string.empty": "Field name must be filled in",
    "string.max": "Field name max 100 character",
  }),
  type: Joi.string()
    .required()
    .max(100)
    .valid("Frontend", "Backend", "Other")
    .messages({
      "any.required": "Field type is Required",
      "string.empty": "Field type must be filled in",
      "string.max": "Field type max 100 character",
    }),
})
export const updateSkillValidation = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Parameter id is Required",
    "string.empty": "Parameter id must be filled in",
  }),
  name: Joi.string().required().max(100).messages({
    "any.required": "Field name is Required",
    "string.empty": "Field name must be filled in",
    "string.max": "Field name max 100 character",
  }),
  type: Joi.string()
    .required()
    .max(100)
    .valid("Frontend", "Backend", "Other")
    .messages({
      "any.required": "Field type is Required",
      "string.empty": "Field type must be filled in",
      "string.max": "Field type max 100 character",
    }),
})
