const { User } = require('../models')

const getOne = async (filter) => {
  return await User.findOne(filter)
}

const add = async ({ email, password }) => {
  const newUser = await new User({ email })
  newUser.setPassword(password)
  await newUser.save()
  return newUser
}

const getValidUser = async (body) => {
  const { email, password } = body
  const user = await getOne({ email })
  if (!user || !user.validPassword(password)) {
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

module.exports = {
  getOne,
  add,
  getValidUser,
  update
}
