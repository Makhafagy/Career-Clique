// tables/User.js

const mongoose = require('mongoose')
const userSchema = require('../schemas/UserSchema')

const User = mongoose.model('User', userSchema, 'User')

module.exports = User
