const db = require('../config/database');

// Fetch all products
const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

// Fetch a single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
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
    const { name, price, description } = req.body;
    try {
        const result = await db.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    try {
        const result = await db.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, id]);
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
