// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { checkSchema } = require('express-validator');
const { validateCategory, validateCategoryId } = require('../validator/categoryValidator');
const categoryController = require('../controllers/categoryController');

router.get('/category', categoryController.getAllCategories);

router.get('/category/:id', validateCategoryId, categoryController.getCategoryById);

router.post('/category', validateCategory, categoryController.createCategory);

router.put('/category/:id', [validateCategoryId, validateCategory], categoryController.updateCategory);

router.delete('/category/:id', validateCategoryId, categoryController.deleteCategory);

module.exports = router;
