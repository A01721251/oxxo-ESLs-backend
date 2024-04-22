const db = require('../config/db_connection');

// Fetch all products
// const getAllProducts = async (req, res) => {
//     try {
//         // console.log("Database connected to:", db.config);
//         const products = await db.all('SELECT * FROM productos');
//         console.log("Products:", products);
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving products', error: error.message });
//     }
// };
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
// const getProductById = async (req, res) => {
//     const { id } = req.params;
//     console.log("ID:", id);
//     try {
//         const product = await db.get('SELECT * FROM productos WHERE producto_id = ?', [id]);
//         console.log("Product:", product);
//         if (product.length) {
//             res.status(200).json(product[0]);
//         } else {
//             res.status(404).json({ message: 'Product not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error retrieving product', error: error.message });
//     }
// };
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
const createProduct = async (req, res) => {
    console.log(req.body);
    const { nombre, precio1, marca } = req.body;
    console.log(nombre, precio1, marca);
    try {
        const result = await db.run('INSERT INTO productos (nombre, precio1, marca) VALUES (?, ?, ?)', [nombre, precio1, marca]);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio1, marca } = req.body;
    try {
        const result = await db.run('UPDATE productos SET nombre = ?, precio1 = ?, marca = ? WHERE id = ?', [nombre, precio1, marca, id]);
        if (result.affectedRows) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct
};
