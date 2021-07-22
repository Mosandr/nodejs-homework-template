const { HttpCode } = require('../../helpers/constants')

const logout = async (req, res, next) => {
  try {
    const { user } = req

    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Unauthorized'
      })
    }

    await user.updateOne({ token: null })
    return res.status(HttpCode.NO_CONTENT).json({
      status: 'No content',
      code: HttpCode.NO_CONTENT
    })
  } catch (error) {
    next(error)
  }
}

module.exports = logout
