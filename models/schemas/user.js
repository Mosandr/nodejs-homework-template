const { Schema } = require('mongoose')

const bCrypt = require('bcryptjs')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      match: [
        /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Email must be in format text@text.domain'
      ],
      required: [true, 'Email is required'],
      unique: true
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter'
    },
    token: {
      type: String
    }
  },
  { versionKey: false, timestamps: true }
)

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6))
}

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password)
}

module.exports = userSchema
