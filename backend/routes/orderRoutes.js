const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');
const { orderValidationRules, validate } = require('../validator/orderValidator');

// Define your routes here

router.get('/orders/', orderController.getAllOrders);
router.get('/orders/:orderId', orderController.getOrderById);
router.post('/orders/', orderValidationRules(), validate, orderController.createOrder);
router.put('/orders/:orderId', orderValidationRules(), validate, orderController.updateOrder);
router.delete('/orders/:orderId', orderController.deleteOrder);

module.exports = router;
