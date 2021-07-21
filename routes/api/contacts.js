const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')
const auth = require('../../middlewares/auth')

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateContactStatus
} = require('../../validation/contacts')

router.get('/', auth, ctrl.getAll)

router.get('/:contactId', auth, ctrl.getById)

router.post('/', auth, validateCreateContact, ctrl.add)

router.delete('/:contactId', auth, ctrl.remove)

router.patch('/:contactId', auth, validateUpdateContact, ctrl.update)

router.patch(
  '/:contactId/favorite',
  auth,
  validateUpdateContactStatus,
  ctrl.updateStatus
)

module.exports = router
