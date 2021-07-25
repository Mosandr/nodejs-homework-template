const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 3600000,
  max: 2,
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      code: 429,
      message:
        'Too many accounts created from this IP, please try again after an hour'
    })
  }
})

const { users: ctrl } = require('../../controllers')

const {
  validateCreateUser,
  validateLogInUser,
  validateUpdateSubsctription
} = require('../../validation/user')

router.post('/signup', limiter, validateCreateUser, ctrl.register)
router.post('/login', validateLogInUser, ctrl.login)
router.post('/logout', auth, ctrl.logout)
router.get('/current', auth, ctrl.getCurrent)
router.patch('/subscription', auth, validateUpdateSubsctription, ctrl.update)

module.exports = router
