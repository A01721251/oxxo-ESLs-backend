const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// Fetch all products
router.get('/', productController.getAllProducts);

// Fetch a single product by ID
router.get('/:id', productController.getProductById);

// Create a new product
router.post('/', verifyToken, verifyRoles('admin'), productController.createProduct);

// Update an existing product
router.put('/:id', verifyToken, verifyRoles('admin'), productController.updateProduct);

module.exports = router;
