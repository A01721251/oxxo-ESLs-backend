const db = require('../config/db_connection');

// Fetch all products
const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.run('SELECT * FROM Productos');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// Fetch a single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.run('SELECT * FROM Productos WHERE id = ?', [id]);
        if (product.length) {
            res.status(200).json(product[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { nombre, precio1, marca } = req.body;
    try {
        const result = await db.run('INSERT INTO Productos (nombre, precio1, marca) VALUES (?, ?, ?)', [nombre, precio1, marca]);
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
        const result = await db.run('UPDATE products SET nombre = ?, precio1 = ?, marca = ? WHERE id = ?', [nombre, precio1, marca, id]);
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
