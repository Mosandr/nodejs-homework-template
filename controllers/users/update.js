const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const update = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const { body } = req

    if (!body.subscription) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field subscription',
        data: 'Bad Request'
      })
    }
    const user = await service.update(userId, req.body)
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: {
          user: {
            email: user.email,
            subsription: user.subscription
          }
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found contact to update',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = update
