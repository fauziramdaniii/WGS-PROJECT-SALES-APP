const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');

// Endpoint untuk membuat order
router.post('/order', orderController.createOrder);
router.put('/order/:id/status', orderController.updateOrderStatus);
router.get('/order', orderController.getOrderHeader)
router.get('/order/product', orderController.getOrderedProducts)
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router;
