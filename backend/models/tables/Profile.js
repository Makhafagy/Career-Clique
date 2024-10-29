// tables/Profile.js

const mongoose = require('mongoose')
const profileSchema = require('../schemas/ProfileSchema')

const Profile = mongoose.model('Profile', profileSchema, 'Profile')

module.exports = Profile
