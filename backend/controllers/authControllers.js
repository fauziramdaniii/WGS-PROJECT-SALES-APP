// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      attributes: ['id', 'email', 'roles', 'token', 'expiredToken', 'password'],
      where: { email },
    });

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      return res.status(500).json({ message: 'JWT secret key is missing' });
    }

    const token = jwt.sign({ id: user.id }, secretKey, {
      expiresIn: '1h',
    });

    user.token = token;
    await user.save();

    const { password: userPass, ...filteredData } = user.toJSON();

    res.status(200).json({ result: filteredData, message: 'Login Succesfull' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { login };
