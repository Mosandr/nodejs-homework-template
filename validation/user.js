const Joi = require('joi')

const { HttpCode } = require('../helpers/constants')

const schemaCreate = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  subscription: Joi.string().valid('starter', 'pro', 'business').optional(),
})

const schemaLogin = Joi.object({
  password: Joi.string().min(8).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
})

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
})

const schemaVerifyEmail = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
})

const validateUser = (schema, body, next) => {
  const { error } = schema.validate(body)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: HttpCode.BAD_REQUEST,
      message,
      data: 'Bad Request',
    })
  }
  next()
}

module.exports.validateCreateUser = (req, _, next) => {
  return validateUser(schemaCreate, req.body, next)
}

module.exports.validateLogInUser = (req, _, next) => {
  return validateUser(schemaLogin, req.body, next)
}

module.exports.validateUpdateSubsctription = (req, _, next) => {
  return validateUser(schemaUpdateSubscription, req.body, next)
}
module.exports.validateVerifyEmail = (req, _, next) => {
  return validateUser(schemaVerifyEmail, req.body, next)
}
