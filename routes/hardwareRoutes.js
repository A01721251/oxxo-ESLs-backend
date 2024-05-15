const express = require('express');
const router = express.Router();
const hardwareController = require('../controllers/hardwareController');

// Fetch price of specific Access Point
router.get('/AP/:tienda_id', hardwareController.updateHardware);

module.exports = router;