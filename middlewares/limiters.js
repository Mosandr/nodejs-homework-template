const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({ windowMs: 900000, max: 100 })

const signupLimiter = rateLimit({
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

module.exports = {
  signupLimiter,
  apiLimiter
}
