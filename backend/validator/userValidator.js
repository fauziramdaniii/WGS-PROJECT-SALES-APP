// userValidator.js
const { body, param, validationResult } = require('express-validator');
const createUserValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  // body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('roles').notEmpty().withMessage('Roles is required'), // Validation for the roles field

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const updateUserValidator = [
  param('id').isNumeric().withMessage('Invalid user ID'),
  body('username').optional().notEmpty().withMessage('Username is required'),
  body('email').optional().isEmail().withMessage('Invalid email address'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

resetPasswordValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
];

module.exports = {
  createUserValidator,
  updateUserValidator,
  resetPasswordValidator
};
