const db = require('../config/db_connection');
const { parseCSVProductos } = require('./csv-uploadController');

// Fetch all products
const getAllProducts = (req, res) => {
    db.all('SELECT * FROM productos', (err, rows) => {
      if (err) {
        res.status(500).json({ message: 'Error retrieving products', error: err.message });
      } else {
        res.status(200).json(rows);
      }
    });
  };

// Fetch a single product by ID
const getProductById = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM productos WHERE producto_id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ message: 'Error retrieving product', error: err.message });
      } else {
        if (row) {
          res.status(200).json(row);
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    });
  };

// Create a new product
const createProduct = (req, res) => {
    const { sku, nombre, categoria, proveedor_id } = req.body;
    db.run('INSERT INTO productos (sku, nombre, categoria, proveedor_id) VALUES (?, ?, ?, ?)', [sku, nombre, categoria, proveedor_id ], function (err) {
      if (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
      } else {
        res.status(201).json({ message: 'Product created successfully', productId: this.lastID });
      }
    });
  };

// Update an existing product
const updateProduct = (req, res) => {
    const { id } = req.params;
    const {sku,nombre, categoria, proveedor_id } = req.body;
    db.run('UPDATE productos SET sku = ?, nombre = ?, categoria = ?, proveedor_id = ? WHERE producto_id = ?', [sku, nombre, categoria, proveedor_id], function (err) {
      if (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
      } else {
        if (this.changes > 0) {
          res.status(200).json({ message: 'Product updated successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    });
  };

  // Delete an existing product  // UNUSED FUNCTION !!
  const deleteProduct = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM productos WHERE producto_id = ?', [id], function (err) {
      if (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
      } else {
        if (this.changes > 0) {
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ message: 'Product not found' });
        }
      }
    });
  }

  // Upload a CSV file with products
  const uploadProducts = (req, res) => {
    const filePath = req.body.filePath; // Assuming file is uploaded and path is available
    parseCSVProductos(filePath, (err, products) => {
      if (err) {
        res.status(500).json({ message: 'Error parsing CSV', error: err.message });
      } else {
        let createCount = 0;
        let errorCount = 0;
  
        const createNextProduct = () => {
          if (createCount + errorCount === products.length) {
            if (errorCount > 0) {
              res.status(500).json({ message: 'Error creating some products' });
            } else {
              res.status(200).json({ message: 'Bulk create successful' });
            }
            return;
          }
  
          const product = products[createCount + errorCount];
          db.run(
            'INSERT INTO productos (sku, nombre, categoria, proveedor_id) VALUES (?, ?, ?, ?)',
            [product.sku, product.nombre, product.categoria, product.proveedor_id],
            function (err) {
              if (err) {
                errorCount++;
              } else {
                createCount++;
              }
              createNextProduct();
            }
          );
        };
  
        createNextProduct();
      }
    });
  };

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProducts
};
