const db = require('../config/db_connection');
const { parseCSV } = require('./csv-uploadController');

// Upload bulk etiquetas
const bulkUploadEtiquetas = (req, res) => {
  const filePath = req.body.filePath; // Assuming file is uploaded and path is available
  parseCSV(filePath, (err, etiquetas) => {
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
          'INSERT INTO etiquetas (etiqueta_id, producto_id, tienda_id, ultima_actualizacion) VALUES (?, ?, ?, ?)',
          [etiqueta.etiqueta_id, etiqueta.producto_id, etiqueta.tienda_id, etiqueta.ultima_actualizacion],
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

module.exports = {
    bulkUploadEtiquetas
};