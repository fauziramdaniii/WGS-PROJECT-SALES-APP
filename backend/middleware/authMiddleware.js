const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { DateTime } = require('luxon'); // Gunakan library waktu seperti Luxon untuk mengelola zona waktu

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Membuat objek DateTime dari Luxon dan menetapkan zona waktu ke 'Asia/Jakarta' (zona waktu Indonesia)
    const currentTime = DateTime.local().setZone('Asia/Jakarta');
    const expirationTime = DateTime.fromSeconds(verified.exp).setZone('Asia/Jakarta');
    
    // Memeriksa apakah token telah kedaluwarsa
    if (currentTime > expirationTime) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    req.user = await User.findByPk(verified.id);
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
