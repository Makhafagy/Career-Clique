const express = require('express')
const router = express.Router()
const profileController = require('../../controllers/profileController')
const multer = require('multer')

const upload = multer()

// POST routes for user profile
router.post('/profile', upload.none(), profileController.profileInformation)

// PUT routes for user profile
router.put('/profile', upload.single('profilePicture'), profileController.profileInformation)

module.exports = router
