const app = require('../app')

const db = require('../db/connect-mongoose')
const createFolderIfNotExsist = require('../helpers/createFolderIfNotExsist')

require('dotenv').config()

const { PORT = 3000, UPLOAD_DIR, AVATARS_DIR } = process.env

db.then(() => {
  console.log('Database connection successful')
  app.listen(PORT, async () => {
    await createFolderIfNotExsist(UPLOAD_DIR)
    await createFolderIfNotExsist(AVATARS_DIR)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log(`Server not running. Error message:${error.message}`)
})
