const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const register = async (req, res, next) => {
  const { email } = req.body
  const user = await service.getOne({ email })
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email is already in use',
      data: 'Conflict'
    })
  }

  try {
    const newUser = await service.add(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      message: 'Registration successful',
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription
        }
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = register
