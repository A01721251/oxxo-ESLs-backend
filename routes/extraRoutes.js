const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');
const etiquetaController = require('../controllers/etiquetaController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// Fetch all tiendas
router.get('/tiendas', tiendaController.getAllTiendas);

// Fetch all etiquetas for a tienda
router.get('/:tienda_id/etiquetas', etiquetaController.getEtiquetasByTienda);

// Bulk upload tiendas
router.post('/bulk-upload-tiendas', verifyToken, verifyRoles('admin'), tiendaController.bulkUploadTiendas);

// Bulk upload etiquetas
router.post('/bulk-upload-etiquetas', verifyToken, verifyRoles('admin'), etiquetaController.bulkUploadEtiquetas);

module.exports = router;