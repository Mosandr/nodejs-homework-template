const passport = require('passport')
const passportJWT = require('passport-jwt')
const { User } = require('../models')
require('dotenv').config()

const { SECRET_KEY } = process.env

const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      const user = await User.findById(payload.id)
      if (!user) {
        return done(new Error('User not found'))
      }
      if (!user.token) {
        return done(null, false)
      }
      return done(null, user)
    } catch (error) {
      done(error)
    }
  })
)
