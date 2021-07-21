const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')

const { users: ctrl } = require('../../controllers')

const {
  validateCreateUser,
  validateLogInUser
} = require('../../validation/user')

router.post('/signup', validateCreateUser, ctrl.register)
router.post('/login', validateLogInUser, ctrl.login)
router.post('/logout', ctrl.logout)
router.get('/current', auth, ctrl.getCurrent)

module.exports = router
