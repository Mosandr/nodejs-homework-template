const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()

const updateAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const { path: filepath, originalname } = req.file

    console.log(req.file)

    if (!req.file) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field avatar',
        data: 'Bad Request'
      })
    }

    const destination = path.normalize(
      path.join(__dirname, '\\..\\..', process.env.AVATARS_DIR, originalname)
    )

    if (req.file) {
      await fs.rename(filepath, destination)
    }

    const avatarURL = { avatarURL: destination }

    const user = await service.update(userId, avatarURL)
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'succes',
        code: HttpCode.OK,
        data: {
          user: {
            email: user.email,
            avatarURL: user.avatarURL
          }
        }
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found user to update',
        data: 'Not Found'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = updateAvatar
