const express = require('express')
const router = express.Router()
const dashboardController = require('../../controllers/dashboardController')
const multer = require('multer')

const upload = multer()

// POST routes for user profile
router.post('/dashboard', upload.none(), dashboardController.summary)

// GET routes for user profile
router.get('/dashboard', upload.none(), dashboardController.getSummary)

module.exports = router
