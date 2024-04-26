const db = require('../config/db_connection');
const { parseCSVPrecios } = require('./csv-uploadController');

// Update price of a single product
const updatePrice = (req, res) => {
  const { precio_actual, tienda_id, producto_id, etiqueta_id } = req.body;
  db.run(
    'UPDATE precio_actual SET precio_actual = ? WHERE tienda_id = ? AND producto_id = ?, AND estiqueta_id = ?',
    [precio_actual, tienda_id, producto_id, etiqueta_id],
    function (err) {
      if (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      } else {
        if (this.changes > 0) {
          res.status(200).json({ message: 'Price updated successfully' });
        } else {
          res.status(404).json({ message: 'Product not found in the specified store' });
        }
      }
    }
  );
};

// Update prices of multiple products
const bulkUpdatePrices = (req, res) => {
  const filePath = req.file.path; // Assuming file is uploaded and path is available
  parseCSVPrecios(filePath, (err, updates) => {
    if (err) {
      res.status(500).json({ message: 'Error parsing CSV', error: err.message });
    } else {
      let updateCount = 0;
      let errorCount = 0;

      const updateNextPrice = () => {
        if (updateCount + errorCount === updates.length) {
          if (errorCount > 0) {
            res.status(500).json({ message: 'Error updating some prices' });
          } else {
            res.status(200).json({ message: 'Bulk update successful' });
          }
          return;
        }

        const update = updates[updateCount + errorCount];
        db.run(
          'UPDATE precio_actual SET precio_actual = ? WHERE tienda_id = ? AND producto_id = ?, AND estiqueta_id = ?',
          [update.precio_actual, update.tienda_id, update.producto_id, update.etiqueta_id],
          function (err) {
            if (err) {
              errorCount++;
            } else {
              updateCount++;
            }
            updateNextPrice();
          }
        );
      };

      updateNextPrice();
    }
  });
};

// Create a new price single product
const createPrice = (req, res) => {
  const { precio_actual, tienda_id, producto_id, etiqueta_id } = req.body;
  db.run(
    'INSERT INTO precio_actual (precio_actual, tienda_id, producto_id, etiqueta_id) VALUES (?, ?, ?, ?)',
    [precio_actual, tienda_id, producto_id, etiqueta_id],
    function (err) {
      if (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      } else {
        res.status(200).json({ message: 'Price created successfully' });
      }
    }
  );
};

// create a new price for multiple products
const bulkCreatePrices = (req, res) => {
  const filePath = req.body.filePath; // Assuming file is uploaded and path is available
  parseCSVPrecios(filePath, (err, updates) => {
    if (err) {
      res.status(500).json({ message: 'Error parsing CSV', error: err.message });
    } else {
      let updateCount = 0;
      let errorCount = 0;

      const updateNextPrice = () => {
        if (updateCount + errorCount === updates.length) {
          if (errorCount > 0) {
            res.status(500).json({ message: 'Error updating some prices' });
          } else {
            res.status(200).json({ message: 'Bulk update successful' });
          }
          return;
        }

        const update = updates[updateCount + errorCount];
        db.run(
          'INSERT INTO precio_actual (precio_actual, tienda_id, producto_id, etiqueta_id) VALUES (?, ?, ?, ?)',
          [update.precio_actual, update.tienda_id, update.producto_id, update.etiqueta_id],
          function (err) {
            if (err) {
              errorCount++;
            } else {
              updateCount++;
            }
            updateNextPrice();
          }
        );
      };

      updateNextPrice();
    }
  });
};

// Get all prices
const getAllPrices = (req, res) => {
  db.all('SELECT * FROM precio_actual', (err, prices) => {
    if (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    } else {
      res.status(200).json(prices);
    }
  });
};

module.exports = { updatePrice, bulkUpdatePrices, createPrice, bulkCreatePrices, getAllPrices};