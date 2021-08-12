const { User } = require('../models')
const { v4 } = require('uuid')
const { sendEmail } = require('./emailService')

const getOne = async filter => {
  return await User.findOne(filter)
}

const add = async ({ email, password }) => {
  const verifyToken = v4()

  //send email with verifyToken

  try {
    await sendEmail(email, verifyToken)
  } catch (error) {
    throw error
  }

  const newUser = await new User({ email, verifyToken })
  newUser.setPassword(password)
  await newUser.save()
  return newUser
}

const getValidUser = async body => {
  const { email, password } = body
  const user = await getOne({ email })
  if (!user || !user.validPassword(password) || !user.verify) {
    return null
  }
  return user
}

const update = async (id, updatedUser) => {
  try {
    return await User.findByIdAndUpdate(id, updatedUser, { new: true })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const verify = async token => {
  try {
    const user = await getOne({ verifyToken: token })
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null })
      return true
    }
    return false
  } catch (error) {
    throw error
  }
}

const verifyByEmail = async email => {
  try {
    const user = await getOne({ email })
    if (user) {
      if (user.verify) return user
      if (!user.verify) {
        await sendEmail(email, user.verifyToken)
        return user
      }
    }
    return null
  } catch (error) {
    throw error
  }
}

module.exports = {
  getOne,
  add,
  getValidUser,
  update,
  verify,
  verifyByEmail,
}
