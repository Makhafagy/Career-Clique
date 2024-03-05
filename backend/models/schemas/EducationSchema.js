// schemas/EducationSchema.js
const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  collegeName: { type: String },
  imageUrl: { type: String },
  graduationDate: { type: Date },
  degree: { type: String },
  gpa: { type: Number },
})

module.exports = educationSchema
