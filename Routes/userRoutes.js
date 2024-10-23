// Backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define routes for user management
router.get('/users', userController.getAllUsers);  // GET /api/users
router.delete('/users/:userId', userController.deleteUser);
router.put('/users/:userId/toggle', userController.toggleUserStatus);

module.exports = router;
