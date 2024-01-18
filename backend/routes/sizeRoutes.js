// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { getSize, addSize } = require('../controllers/sizeControllers');


router.get('/size', getSize);
router.post('/size', addSize)

module.exports = router;
