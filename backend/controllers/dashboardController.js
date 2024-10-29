const jwt = require('jsonwebtoken')
const Summary = require('../models/tables/Summary')
const Education = require('../models/tables/Education')
const { JWT_SECRET } = require('../config')
const { refreshAccessToken } = require('../utils/tokenUtils')

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

exports.getSummary = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      // Check if the token is expired
      const decodedToken = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // If the token is expired, attempt to refresh it
        try {
          token = await refreshAccessToken(token) // Call the function to refresh the token
          req.headers.authorization = `Bearer ${token}` // Update the request headers with the new access token
        } catch (refreshError) {
          return res.status(401).json({ error: 'Token refresh failed' })
        }
      } else {
        return res.status(403).json({ error: 'Forbidden' })
      }
    }

    // Proceed with the database query for fetching summary
    const decodedToken = jwt.verify(token, JWT_SECRET)
    const userId = decodedToken.userId
    const summary = await Summary.findOne({ user: userId })

    if (!summary) {
      return res.status(404).json({ error: 'Summary not found for this user' })
    }

    // Respond with summary description
    return res.status(200).json({ summary: summary.description })
  } catch (error) {
    console.error('Error fetching summary:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

exports.getEducation = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
      // Check if the token is expired
      const decodedToken = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        // If the token is expired, attempt to refresh it
        try {
          token = await refreshAccessToken(token) // Call the function to refresh the token
          req.headers.authorization = `Bearer ${token}` // Update the request headers with the new access token
        } catch (refreshError) {
          return res.status(401).json({ error: 'Token refresh failed' })
        }
      } else {
        return res.status(403).json({ error: 'Forbidden' })
      }
    }

    // Proceed with the database query for fetching education data
    const decodedToken = jwt.verify(token, JWT_SECRET)
    const userId = decodedToken.userId
    const educationData = await Education.find({ user: userId })

    if (!educationData || educationData.length === 0) {
      return res.status(404).json({ error: 'Education data not found for this user' })
    }

    // Respond with education data
    res.status(200).json(educationData)
  } catch (error) {
    console.error('Error fetching education data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Function to get dashboard data based on data type
exports.getDashboardData = async (req, res) => {
  try {
    const { dataType } = req.query
    if (dataType === 'summary') {
      // Call getSummary function to fetch summary data
      return exports.getSummary(req, res)
    } else if (dataType === 'education') {
      // Call getEducation function to fetch education data
      return exports.getEducation(req, res)
    } else {
      return res.status(400).json({ error: 'Invalid data type' })
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
