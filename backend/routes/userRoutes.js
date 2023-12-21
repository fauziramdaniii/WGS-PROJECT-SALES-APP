// Package
const express = require('express');
const router = express.Router();

// Import Module Controller
const UserController = require('../controllers/usersController');
const { createUserValidator } = require('../validator/userValidator'); // Import the validators

// Routes for CRUD operations
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', createUserValidator, UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/reset-password', UserController.resetPassword);


module.exports = router;
