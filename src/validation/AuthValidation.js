import Joi from "joi"
export const RegisterValidation = Joi.object({
  name: Joi.string().required().max(100).messages({
    "any.required": "Field name is Required",
    "string.empty": "Field name must be filled in",
    "string.max": "Field name max 100 character",
  }),
  email: Joi.string().required().max(100).email().messages({
    "any.required": "Field email is Required",
    "string.email": "Field email is not valid email",
    "string.empty": "Field email must be filled in",
    "string.max": "Field email max 100 character",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Field password is Required",
    "string.empty": "Field password must be filled in",
    "string.min": "Field password min 8 character",
  }),
  confPassword: Joi.string().required().min(8).messages({
    "any.required": "Field confirm password is Required",
    "string.empty": "Field confirm password must be filled in",
    "string.min": "Field confirm password min 8 character",
  }),
})
export const LoginnValidation = Joi.object({
  email: Joi.string().required().max(100).email().messages({
    "any.required": "Field email is Required",
    "string.email": "Field email is not valid email",
    "string.empty": "Field email must be filled in",
    "string.max": "Field email max 100 character",
  }),
  password: Joi.string().required().min(8).messages({
    "any.required": "Field password is Required",
    "string.empty": "Field password must be filled in",
    "string.min": "Field password min 8 character",
  }),
})
