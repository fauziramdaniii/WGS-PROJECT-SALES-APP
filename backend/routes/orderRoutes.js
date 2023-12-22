const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');

// Endpoint untuk membuat order
router.post('/order', orderController.createOrder);
router.put('/order/:id/status', orderController.updateOrderStatus);
router.get('/order', orderController.getAllOrders)
router.get('/orders/user/:id_user', orderController.getOrdersByUserId);

module.exports = router;
