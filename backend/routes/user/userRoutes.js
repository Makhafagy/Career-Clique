const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const authController = require('../../controllers/authController')
const { authenticateToken } = require('../../middleware/authMiddleware');

// GET route for listing users (remove /api/users prefix)
// router.get('/signup', function (req, res, next) {
//   res.send({ users: ['joe', 'bernie', 'tulsi', 'donald', 'bill'] })
// })

// // Protected route
router.get('/login', authenticateToken, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// // GET route for authentication endpoint
// router.get('/authentication', authController.checkAuthentication)

// POST route for user signup
router.post('/signup', userController.signUp)

// POST route for user login
router.post('/login', userController.logIn)

module.exports = router
