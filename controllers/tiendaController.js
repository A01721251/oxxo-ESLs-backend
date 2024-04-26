const db = require('../config/db_connection');
const { parseCSVTiendas } = require('./csv-uploadController');

// Upload bulk tiendas
const bulkUploadTiendas = (req, res) => {
  const filePath = req.body.filePath; // Assuming file is uploaded and path is available
  parseCSVTiendas(filePath, (err, tiendas) => {
    if (err) {
      res.status(500).json({ message: 'Error parsing CSV', error: err.message });
    } else {
      let uploadCount = 0;
      let errorCount = 0;

      const uploadNextTienda = () => {
        if (uploadCount + errorCount === tiendas.length) {
          if (errorCount > 0) {
            res.status(500).json({ message: 'Error uploading some tiendas' });
          } else {
            res.status(200).json({ message: 'Bulk upload successful' });
          }
          return;
        }

        const tienda = tiendas[uploadCount + errorCount];
        db.run(
          'INSERT INTO tiendas (nombre, ubicacion, telefono, region_id, zona_id) VALUES (?, ?, ?, ?, ?)',
          [tienda.nombre, tienda.ubicacion, tienda.telefono, tienda.region_id, tienda.zona_id],
          function (err) {
            if (err) {
              errorCount++;
            } else {
              uploadCount++;
            }
            uploadNextTienda();
          }
        );
      };

      uploadNextTienda();
    }
  });
};

// Get all tiendas
const getAllTiendas = (req, res) => {
  db.all('SELECT * FROM tiendas', (err, tiendas) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching tiendas', error: err.message });
    } else {
      res.status(200).json({ tiendas });
    }
  });
};

module.exports = {
    bulkUploadTiendas,
    getAllTiendas
};