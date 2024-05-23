const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// Upload csv dependencies
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Fetch all products
router.get('/', verifyToken, productController.getAllProducts);

// Fetch a single product by ID
router.get('/id/:id', verifyToken, productController.getProductById);

// Create a new product
router.post('/', verifyToken, verifyRoles('admin'), productController.createProduct);

// Update an existing product
router.put('/:id', verifyToken, verifyRoles('admin'), productController.updateProduct);

// Upload a CSV file to create multiple products
router.post('/bulk-create', verifyToken, verifyRoles('admin'), upload.single('file'), productController.uploadProducts);

// Fetch all products with their prices
router.get('/prices/:tienda_id', productController.getProductsPrice);

module.exports = router;
