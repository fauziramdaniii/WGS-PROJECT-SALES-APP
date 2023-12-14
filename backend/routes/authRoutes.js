// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authControllers');
const { authenticateToken, logout } = require('../middleware/authMiddleware');

router.post('/login', login);

router.post('/logout', authenticateToken, logout);

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
