const db = require('../config/db_connection');

const updatePrice = async (req, res) => {
    const { productId, newPrice, storeId } = req.body;
    try {
        const result = await db.query(
            'UPDATE prices SET price = ? WHERE product_id = ? AND store_id = ?',
            [newPrice, productId, storeId]
        );
        if (result.affectedRows) {
            res.status(200).json({ message: 'Price updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found in the specified store' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const bulkUpdatePrices = async (req, res) => {
    const filePath = req.file.path; // Assuming file is uploaded and path is available
    const updates = await parseCSV(filePath); // Function to parse CSV needs to be implemented
    try {
        updates.forEach(async update => {
            await db.query(
                'UPDATE prices SET price = ? WHERE product_id = ? AND store_id = ?',
                [update.newPrice, update.productId, update.storeId]
            );
        });
        res.status(200).json({ message: 'Bulk update successful' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating prices', error: err.message });
    }
};

module.exports = {
    updatePrice,
    bulkUpdatePrices
};
