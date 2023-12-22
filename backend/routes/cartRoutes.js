// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const cartValidator = require('../validator/cartValidator');
const cartController = require('../controllers/cartControllers');

// Create a cart
router.post('/cart', cartValidator.createCart, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  cartController.createCart(req, res);
});

// Get all carts
router.get('/cart', async (req, res) => {
  cartController.getCart(req, res);
});

router.get('/cart/:id', async (req, res) => {
  const { id } = req.params;
  cartController.getCartById(req, res);
});

router.get('/cart/user/:id_user', async (req, res) => {
  const { id_user } = req.params;
  cartController.getCartsByUserId(req, res);
});

// Update a cart by ID
router.put('/cart/:id', cartValidator.createCart, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  cartController.updateCart(req, res);
});

// Delete a cart by ID
router.delete('/cart/:id', async (req, res) => {
  cartController.deleteCart(req, res);
});

module.exports = router;
