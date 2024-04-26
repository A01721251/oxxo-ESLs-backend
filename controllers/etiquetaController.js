const db = require('../config/db_connection');
const { parseCSVEtiquetas } = require('./csv-uploadController');

// Upload bulk etiquetas
const bulkUploadEtiquetas = (req, res) => {
  const filePath = req.body.filePath; // Assuming file is uploaded and path is available
  parseCSVEtiquetas(filePath, (err, etiquetas) => {
    if (err) {
      res.status(500).json({ message: 'Error parsing CSV', error: err.message });
    } else {
      let uploadCount = 0;
      let errorCount = 0;

      const uploadNextEtiqueta = () => {
        if (uploadCount + errorCount === etiquetas.length) {
          if (errorCount > 0) {
            res.status(500).json({ message: 'Error uploading some etiquetas' });
          } else {
            res.status(200).json({ message: 'Bulk upload successful' });
          }
          return;
        }

        const etiqueta = etiquetas[uploadCount + errorCount];
        db.run(
          'INSERT INTO etiquetas (producto_id, tienda_id) VALUES (?, ?)',
          [etiqueta.producto_id, etiqueta.tienda_id],
          function (err) {
            if (err) {
              errorCount++;
            } else {
              uploadCount++;
            }
            uploadNextEtiqueta();
          }
        );
      };

      uploadNextEtiqueta();
    }
  });
};

// Get all etiquetas for a tienda
const getEtiquetasByTienda = (req, res) => {
  const { tienda_id } = req.params;
  db.all('SELECT * FROM etiquetas WHERE tienda_id = ?', [tienda_id], (err, etiquetas) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching etiquetas', error: err.message });
    } else {
      res.status(200).json({ etiquetas });
    }
  });
};

module.exports = {
    bulkUploadEtiquetas,
    getEtiquetasByTienda
};