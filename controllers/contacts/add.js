const { contact: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')

const add = async (req, res, next) => {
  try {
    const newContact = { ...req.body, owner: req.user.id }
    const contact = await service.add(newContact)
    res.status(HttpCode.CREATED).json({
      status: 'succes',
      code: HttpCode.CREATED,
      data: {
        contact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
