const db = require('../config/db_connection');

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
    const { nombre, precio1, marca } = req.body;
    db.run('INSERT INTO productos (nombre, precio1, marca) VALUES (?, ?, ?)', [nombre, precio1, marca], function (err) {
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
    const { nombre, precio1, marca } = req.body;
    db.run('UPDATE productos SET nombre = ?, precio1 = ?, marca = ? WHERE producto_id = ?', [nombre, precio1, marca, id], function (err) {
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

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
