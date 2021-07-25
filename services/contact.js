const { Contact } = require('../models')

const getAll = (userId, query) => {
  const { page = 1, limit = 20, favorite } = query

  const options = {
    page,
    limit
  }

  const populate = { path: 'owner', select: 'email' }

  const opt = { ...options, populate }

  if (favorite) {
    return Contact.paginate({ owner: userId, favorite }, opt)
  }

  return Contact.paginate({ owner: userId }, opt)
}

const getById = async (userId, id) => {
  try {
    return await Contact.findOne({ owner: userId, _id: id }).populate(
      'owner',
      'email'
    )
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const add = (newContact) => {
  return Contact.create(newContact)
}

const remove = async (userId, id) => {
  try {
    return await Contact.findOneAndRemove({ owner: userId, _id: id })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const update = async (userId, id, updateContact) => {
  try {
    return await Contact.findOneAndUpdate(
      { owner: userId, _id: id },
      updateContact,
      { new: true }
    )
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const updateStatusContact = async (userId, id, updateContact) => {
  try {
    return await Contact.findOneAndUpdate(
      { owner: userId, _id: id },
      updateContact,
      { new: true }
    )
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact
}
