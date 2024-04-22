const express = require('express');
const router = express.Router();
const priceController = require('../controllers/priceController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// Route to update a single price
router.post('/update', verifyToken, verifyRoles('admin'), priceController.updatePrice);

// Route for bulk price updates from a CSV file
router.post('/bulk-update', verifyToken, verifyRoles('admin'), priceController.bulkUpdatePrices);

// Route to create a new price for a single product
router.post('/create', verifyToken, verifyRoles('admin'), priceController.createPrice);

// Route for bulk price creation from a CSV file
router.post('/bulk-create', verifyToken, verifyRoles('admin'), priceController.bulkCreatePrices);

module.exports = router;
