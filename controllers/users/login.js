const { User } = require('../../models')
const { HttpCode } = require('../../helpers/constants')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.validPassword(password)) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong',
      data: 'Unauthorized'
    })
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await user.update({ token })

  res.json({
    status: 'success',
    code: HttpCode.OK,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    }
  })
}

module.exports = login
