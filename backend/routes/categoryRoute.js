// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateCategory, validateCategoryId } = require('../validator/categoryValidator');
const categoryController = require('../controllers/categoryController');
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

router.get('/category', categoryController.getAllCategories);

router.get('/category/:id', validateCategoryId, categoryController.getCategoryById);

router.post('/category', validateCategory,upload.single('image'), categoryController.createCategory);

router.put('/category/:id', [validateCategoryId,upload.single('image'), validateCategory], categoryController.updateCategory);

router.delete('/category/:id', validateCategoryId, categoryController.deleteCategory);

module.exports = router;
