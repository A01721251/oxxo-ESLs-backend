const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');
const etiquetaController = require('../controllers/etiquetaController');

// Fetch all tiendas
router.get('/tiendas', tiendaController.getAllTiendas);

// Fetch all etiquetas for a tienda
router.get('/:tienda_id/etiquetas', etiquetaController.getEtiquetasByTienda);

// Bulk upload tiendas
router.post('/bulk-upload-tiendas', tiendaController.bulkUploadTiendas);

// Bulk upload etiquetas
router.post('/bulk-upload-etiquetas', etiquetaController.bulkUploadEtiquetas);

module.exports = router;