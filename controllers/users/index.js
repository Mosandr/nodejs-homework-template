const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const getCurrent = require('./getCurrent')
const update = require('./update')
const updateAvatar = require('./updateAvatar')
const verifyEmailByToken = require('./verifyEmailByToken')
const verifyEmail = require('./verifyEmail')

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  update,
  updateAvatar,
  verifyEmailByToken,
  verifyEmail,
}
