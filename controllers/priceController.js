const db = require('../config/db_connection');

// Update price of a single product
const updatePrice = (req, res) => {
  const { productId, newPrice, storeId } = req.body;
  db.run(
    'UPDATE prices SET price = ? WHERE product_id = ? AND store_id = ?',
    [newPrice, productId, storeId],
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
  parseCSV(filePath, (err, updates) => {
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
          'UPDATE prices SET price = ? WHERE product_id = ? AND store_id = ?',
          [update.newPrice, update.productId, update.storeId],
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

module.exports = { updatePrice, bulkUpdatePrices };