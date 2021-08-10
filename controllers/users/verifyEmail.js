const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const verifyEmail = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'missing required field email',
    })
  }

  try {
    const user = await service.verifyByEmail(email)

    if (user) {
      return user.verify
        ? res.status(HttpCode.BAD_REQUEST).json({
            status: 'error',
            code: HttpCode.BAD_REQUEST,
            message: 'Verification has already been passed',
          })
        : res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            message: 'Varification link sended on your email',
          })
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'User not found',
    })
  } catch (error) {
    next(error)
  }
}
module.exports = verifyEmail
