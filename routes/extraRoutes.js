const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');
const etiquetaController = require('../controllers/etiquetaController');
const { verifyToken, verifyRoles } = require('../middlewares/authMiddleware');

// Upload csv dependencies
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Fetch all tiendas
router.get('/tiendas', verifyToken, tiendaController.getAllTiendas);

// Fetch all etiquetas for a tienda
router.get('/etiquetas', verifyToken, etiquetaController.getEtiquetasByTienda);

// Bulk upload tiendas
router.post('/bulk-upload-tiendas', verifyToken, verifyRoles('admin'), upload.single('file'),tiendaController.bulkUploadTiendas);

// Bulk upload etiquetas
router.post('/bulk-upload-etiquetas', verifyToken, verifyRoles('admin'), upload.single('file'),etiquetaController.bulkUploadEtiquetas);

module.exports = router;