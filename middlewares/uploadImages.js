const multer = require('multer')
const path = require('path')
require('dotenv').config()

const UPLOAD_DIR = path.normalize(
  path.join(__dirname, '\\..', process.env.UPLOAD_DIR)
)

const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.includes('image')) {
        cb(null, true)
        return
      }
      cb(null, false)
    }
  })

  return upload
}

module.exports = uploadImage
