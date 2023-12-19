// validators/categoryValidator.js
const { body, param } = require('express-validator');

validateCategory = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
];

validateCategoryId = [
  param('id').isInt().withMessage('Invalid category ID'),
];

module.exports = {validateCategory, validateCategoryId}