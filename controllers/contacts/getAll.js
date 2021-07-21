const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const getAll = async (req, res, next) => {
  const { id } = req.user
  try {
    const contacts = await service.getAll(id)

    res.status(HttpCode.OK).json({
      status: 'succes',
      code: HttpCode.OK,
      data: {
        contacts
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
