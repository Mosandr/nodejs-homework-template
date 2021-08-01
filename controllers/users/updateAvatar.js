const { user: service } = require('../../services')
const { HttpCode } = require('../../helpers/constants')
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config()
const Jimp = require('jimp')
const cloudinary = require('cloudinary').v2

const { API_KEY, API_SECRET, CLOUD_NAME } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
})

const updateAvatar = async (req, res, next) => {
  try {
    const { _id: userId } = req.user
    const { path: filepath, originalname } = req.file

    if (!req.file) {
      return next({
        status: HttpCode.BAD_REQUEST,
        message: 'Missing field avatar',
        data: 'Bad Request',
      })
    }

    const destination = path.normalize(
      path.join(
        __dirname,
        '\\..\\..',
        process.env.AVATARS_DIR,
        userId.toString() + '_' + Date.now() + '_' + originalname,
      ),
    )

    if (req.file) {
      const img = await Jimp.read(filepath)
      await img
        .autocrop()
        .cover(
          250,
          250,
          Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(filepath)
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
            avatarURL: user.avatarURL,
          },
        },
      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not found user to update',
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = updateAvatar
