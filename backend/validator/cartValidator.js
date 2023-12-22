// validators/cartValidator.js
const { body } = require('express-validator');

const cartValidator = {
  createCart: [
    body('quantity').isInt().withMessage('Quantity must be an integer'),
  ],
  // Add update and delete validators as needed
};

module.exports = cartValidator;
