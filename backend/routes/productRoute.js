// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { validateProduct } = require('../validator/productValidator');
const productController = require('../controllers/productController');

router.post('/product', validateProduct, productController.createProduct);
// Tambahkan rute-rute lainnya seperti GET, PUT, DELETE

module.exports = router;
