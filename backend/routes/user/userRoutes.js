// routes/user/userRoutes.js

const express = require('express');
const router = express.Router();

// Import user controller
const userController = require('../../controllers/userController');

// Define user routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
