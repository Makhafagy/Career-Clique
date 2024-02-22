const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')

// GET route for listing users (remove /api/users prefix)
router.get('/signup', function (req, res, next) {
  console.log('GET "signup" route hit')
  res.send({ users: ['joe', 'bernie', 'tulsi', 'donald', 'bill'] })
})

// POST route for user signup
router.post('/signup', userController.signUp)
console.log('userRoutes')

module.exports = router
