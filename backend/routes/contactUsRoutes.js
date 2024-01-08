// routes/contactUsRoutes.js
const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');

// Create ContactUs
router.post('/contactUs', contactUsController.createContactUs);

// Get all ContactUs
router.get('/contactUs', contactUsController.getContactUs);

module.exports = router;
