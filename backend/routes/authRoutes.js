// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authControllers');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/logout', authenticateToken, logout); // Add the logout route

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
