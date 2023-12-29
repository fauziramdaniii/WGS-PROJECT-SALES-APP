const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');

// Endpoint untuk membuat order
router.post('/order', orderController.createOrder);
router.put('/order/:id/status', orderController.updateOrderStatus);
router.get('/order', orderController.getOrder)
router.get('/order/:id_user', orderController.getOrderByUserId);
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router;
