// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { validateProduct } = require('../validator/productValidator');
const productController = require('../controllers/productController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Specify your upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });
// Create a new product
router.post('/products', validateProduct, upload.single('image'), productController.createProduct);

// Get all products
router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

// Update a product by ID
router.put('/products/:id', validateProduct,upload.single('image'), productController.updateProduct);

// Delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
