const jwt = require('jsonwebtoken')
const Summary = require('../models/tables/Summary')
const { JWT_SECRET } = require('../config')

exports.summary = async (req, res) => {
  try {
    // Extract the summary description from the request body
    const { summary: description } = req.body

    // Extract user information from the JWT token
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const decodedToken = jwt.verify(token, JWT_SECRET)
    // Find the user's summary by _id
    const userId = decodedToken.userId // Assuming you have user information stored in the request object
    let summary = await Summary.findOne({ user: userId })

    if (!summary) {
      // If summary doesn't exist for the user, create a new one
      summary = new Summary({ user: userId, description })
    } else {
      // If summary exists, update the description
      summary.description = description
    }

    // Save the summary to the database
    await summary.save()

    // Respond with success message
    res.status(200).json({ message: 'Summary description saved successfully' })
  } catch (error) {
    console.error('Error saving summary description:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to handle GET request for fetching summary
exports.getSummary = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const decodedToken = jwt.verify(token, JWT_SECRET)
    const userId = decodedToken.userId
    const summary = await Summary.findOne({ user: userId })

    if (!summary) {
      return res.status(404).json({ error: 'Summary not found for this user' })
    }

    // Respond with summary description
    res.status(200).json({ summary: summary.description })
  } catch (error) {
    console.error('Error fetching summary:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
