// routes/appConfigRoutes.js
const express = require('express');
const router = express.Router();
const appConfigController = require('../controllers/appConfigController');

// GET config
router.get('/config', appConfigController.getConfig);

// PUT update config
router.put('/config', appConfigController.updateConfig);

module.exports = router;
