const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const verifyEmailByToken = async (req, res, next) => {
  const { token } = req.params

  try {
    const result = await service.verify(token)
    if (result) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message: 'Varification successful',
      })
    }

    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'Verification has already been passed',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verifyEmailByToken
