const { HttpCode } = require('../../helpers/constants')

const getCurrent = async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Unauthorized'
      })
    }

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getCurrent
