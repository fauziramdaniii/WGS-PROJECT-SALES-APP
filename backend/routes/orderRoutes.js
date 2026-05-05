const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const orderController = require('../controllers/orderControllers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `proof-${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/order', orderController.createOrder);
router.put('/order/:id/status', orderController.updateOrderStatus);
router.put('/order/:id/cancel', orderController.cancelOrder);
router.post('/order/:id/payment-proof', upload.single('payment_proof'), orderController.uploadPaymentProof);
router.get('/order', orderController.getOrder);
router.get('/order/:id_user', orderController.getOrderByUserId);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;
