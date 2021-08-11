const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const { signupLimiter } = require('../../middlewares/limiters')
const uploadImage = require('../../middlewares/uploadImages')

const { users: ctrl } = require('../../controllers')

const {
  validateCreateUser,
  validateLogInUser,
  validateUpdateSubsctription,
  validateVerifyEmail,
} = require('../../validation/user')

router.post('/signup', signupLimiter, validateCreateUser, ctrl.register)
router.post('/verify', validateVerifyEmail, ctrl.verifyEmail)
router.get('/verify/:token', ctrl.verifyEmailByToken)
router.post('/login', validateLogInUser, ctrl.login)
router.post('/logout', auth, ctrl.logout)
router.get('/current', auth, ctrl.getCurrent)
router.patch('/subscription', auth, validateUpdateSubsctription, ctrl.update)
router.patch(
  '/avatars',
  auth,
  uploadImage().single('avatar'),
  ctrl.updateAvatar,
)

module.exports = router
