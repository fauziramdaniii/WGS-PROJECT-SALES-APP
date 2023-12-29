// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const expiredOrder = require('../controllers/expiredOrderControllers')

router.post('/expired-order', expiredOrder.createExpiredOrder);
router.get('/expired-order', expiredOrder.getAllExpiredOrder)
router.put('/expired-order/:id', expiredOrder.updateExpiredOrder);

module.exports = router;
