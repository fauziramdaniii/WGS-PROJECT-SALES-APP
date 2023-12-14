// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); // Sesuaikan dengan path model

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // menentukan JWT_SECRET di environment Anda
    req.user = await User.findByPk(verified.id); // Menyimpan informasi user dalam request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const logout = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    user.token = null;
    await user.save();
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { authenticateToken, logout };
