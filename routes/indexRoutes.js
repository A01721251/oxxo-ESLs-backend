const express = require('express');
const router = express.Router();

// Import route modules
const priceRoutes = require('./priceRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

// Use routes
router.use('/prices', priceRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

module.exports = router;
