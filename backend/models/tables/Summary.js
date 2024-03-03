// tables/Summary.js

const mongoose = require('mongoose')
const summarySchema = require('../schemas/SummarySchema')

const Summary = mongoose.model('Summary', summarySchema, 'Summary')

module.exports = Summary
