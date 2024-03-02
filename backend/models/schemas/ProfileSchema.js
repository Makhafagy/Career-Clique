// schemas/ProfileSchema.js
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  bio: { type: String, required: true, unique: true },
  picture: { type: String }, // You can store the file path or URL of the picture
})

module.exports = profileSchema
