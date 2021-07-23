const passport = require('passport')
const { HttpCode } = require('../helpers/constants')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        statusMessage: 'Error',
        status: HttpCode.UNAUTHORIZED,
        data: {
          message: 'Not authorized'
        }
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = auth
