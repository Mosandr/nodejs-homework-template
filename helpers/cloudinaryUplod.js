const cloudinary = require('cloudinary').v2
require('dotenv').config()

const { API_KEY, API_SECRET, CLOUD_NAME } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
})

const upload = pathFile => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      pathFile,
      { folder: 'avatars', tranformation: {} },
      function (err, result) {
        if (err) reject(err)
        if (result) resolve(result)
      },
    )
  })
}

module.exports = upload
