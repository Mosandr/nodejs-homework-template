const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET_KEY } = process.env

const getPaylodFromToken = (req) => {
  const [, token] = req.get('authorization')
    ? req.get('authorization').split(' ')
    : [null, null]

  const payload = jwt.decode(token, SECRET_KEY)

  if (!payload) return { id: null }

  return payload
}

module.exports = getPaylodFromToken
