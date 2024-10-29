// tables/Education.js

const mongoose = require('mongoose')
const educationSchema = require('../schemas/EducationSchema')

const Education = mongoose.model('Education', educationSchema, 'Education')

module.exports = Education