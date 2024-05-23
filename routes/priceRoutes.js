const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// Upload csv dependencies
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Route to update a single price
router.post('/update', verifyToken, verifyRoles('admin'), priceController.updatePrice);

// Route for bulk price updates from a CSV file
router.post('/bulk-update', verifyToken, verifyRoles('admin'), upload.single('file'), priceController.bulkUpdatePrices);

// Route to create a new price for a single product
router.post('/create', verifyToken, verifyRoles('admin'), priceController.createPrice);

// Route for bulk price creation from a CSV file
router.post('/bulk-create', verifyToken, verifyRoles('admin'), upload.single('file') ,priceController.bulkCreatePrices);

// Route to get all prices
router.get('/', priceController.getAllPrices);

module.exports = router;
