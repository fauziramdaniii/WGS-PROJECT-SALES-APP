// validators/productValidator.js
const { body, validationResult } = require('express-validator');

exports.validateProduct = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('image').isString().withMessage('Image must be a string'),
  body('description').isString().withMessage('Description must be a string'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('id_category').isInt({ min: 1 }).withMessage('Category ID must be a positive integer'),
];

// Ekspor validationResult jika diperlukan
exports.validationResult = validationResult;
