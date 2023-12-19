//userRoutes

const express = require('express');
const UserController = require('../controllers/usersController');
const { createUserValidator } = require('../validator/userValidator'); // Import the validators

const router = express.Router();

// Routes for CRUD operations
router.post('/users', createUserValidator, UserController.createUser);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/reset-password', UserController.resetPassword);


module.exports = router;
