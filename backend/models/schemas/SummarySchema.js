// schemas/SummarySchema.js
const mongoose = require('mongoose')

const summarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User collection
  description: { type: String },
})

module.exports = summarySchema
