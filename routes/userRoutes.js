const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// List all users
router.get('/', verifyToken, verifyRoles('admin'), userController.getUsers);

// Create a new user
router.post('/', verifyToken, verifyRoles('admin'), userController.createUser);

// Update user role
router.put('/:id/role', verifyToken, verifyRoles('admin'), userController.updateUser);

module.exports = router;
