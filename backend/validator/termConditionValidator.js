// validators/termConditionValidator.js
const { body, param } = require('express-validator');

const createTermConditionValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('content is required'),
];

const updateTermConditionValidator = [
  param('id').isInt().withMessage('Invalid ID'),
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('content is required'),
];

module.exports = {
  createTermConditionValidator,
  updateTermConditionValidator,
};
