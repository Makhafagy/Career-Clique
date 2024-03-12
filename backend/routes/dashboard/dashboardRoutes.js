const express = require('express')
const router = express.Router()
const dashboardController = require('../../controllers/dashboardController')
const { authenticateToken } = require('../../middleware/authMiddleware')
const multer = require('multer')

const upload = multer()

// POST routes for dashboard
router.post('/dashboard', upload.none(), dashboardController.summary)

// GET routes for dashboard
router.get('/dashboard',  upload.none(), dashboardController.getDashboardData)

module.exports = router
