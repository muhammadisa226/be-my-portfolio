import Joi from "joi"
export const EditUserValidation = Joi.object({
  name: Joi.string().required().max(100).messages({
    "string.empty": "Field name must be filled in",
    "string.max": "Field name max 100 character",
    "any.requires": "Field email is Required",
  }),
  email: Joi.string().optional().max(100).email().messages({
    "string.email": "Field email is not valid email",
    "string.empty": "Field name must be filled in",
    "string.max": "Field email max 100 character",
  }),
  profile: Joi.string().optional().max(100).messages({
    "string.empty": "Field name must be filled in",
    "string.max": "Field email max 100 character",
  }),
  url_profile: Joi.string().optional().messages({
    "string.empty": "Field name must be filled in",
  }),
})
export const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(8).messages({
    "any.required": "Field password is Required",
    "string.empty": "Field password must be filled in",
    "string.min": "Field password min 8 character",
  }),
  confPassword: Joi.string().required().min(8).messages({
    "any.required": "Field Confirm password is Required",
    "string.empty": "Field Confirm password must be filled in",
    "string.min": "Field Confirm password min 8 character",
  }),
})
