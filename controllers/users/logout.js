const { User } = require('../../models')
const { HttpCode } = require('../../helpers/constants')
const getPaylodFromToken = require('../../helpers/getPayloadFromToken')

const logout = async (req, res, next) => {
  try {
    const { id } = getPaylodFromToken(req)
    const user = await User.findById(id)

    if (!id || !user) {
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
