const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const { id: userId } = req.user
    const contact = await service.remove(userId, contactId)
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: {
          contact
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found Contact',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = remove
