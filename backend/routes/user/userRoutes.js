const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authController = require('../../controllers/authController')
const { authenticateToken } = require('../../middleware/authMiddleware')

// Protected route
router.get('/login', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user })
})

// POST route for user signup
router.post('/signup', userController.signup)

// POST route for user login
router.post('/login', userController.login)

module.exports = router
