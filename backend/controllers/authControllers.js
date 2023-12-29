// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { logActivity } = require('../utils/logactivity')

const login = async (req, res) => {
  const {  email, password } = req.body;

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

    const { password: userPass, ...filteredData } = user.toJSON();

      await logActivity({
      timestamp: new Date(),
      activityType: 'Login',
      user: user.id,
      details: 'Login successful',
      ipAddress: req.ip,
      device: req.headers['user-agent'],
      status: 'Success',
    });

    res.status(200).json({ result: filteredData, message: 'Login Succesfull' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const register = async (req, res) => {
  const { fullname, email, password, roles } = req.body;

  try {
    // Check if user with the same email already exists
    const existingUser = await User.findOne({
      attributes: ['id'],
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      roles: roles || 'user', // Default role is 'user'
    });

    res.status(201).json({ result: newUser, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.params.id; // Assuming you have middleware to extract user information from the token

  try {
    const user = await User.findByPk(userId);
    console.log(user)

    if (!user || !user.password || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: 'Invalid old password' });
    }

    // Hash the new password before saving it to the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await User.update({ password: hashedNewPassword }, { where: { id: userId } });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { login, register, changePassword };

