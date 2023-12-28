// routes/termConditionRoutes.js
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const termConditionController = require('../controllers/termConditionControllers');
const termConditionValidator = require('../validator/termConditionValidator');

// GET all term conditions
router.get('/term-conditions', termConditionController.getAllTermConditions);

// GET a term condition by ID
router.get('/term-conditions/:id', termConditionController.getTermConditionById);

// POST create a new term condition
router.post(
  '/term-conditions',
  termConditionValidator.createTermConditionValidator,
  termConditionController.createTermCondition
);

// PUT update a term condition by ID
router.put(
  '/term-conditions/:id',
  [param('id').isInt().withMessage('Invalid ID'), termConditionValidator.updateTermConditionValidator],
  termConditionController.updateTermCondition
);

router.delete(
  '/term-conditions/:id', termConditionController.deleteTermCondition
);


module.exports = router;
