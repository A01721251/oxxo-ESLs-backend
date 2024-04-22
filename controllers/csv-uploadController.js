const fs = require('fs');
const csv = require('csv-parser');
const db = require('../config/db_connection');

const parseCSVAndUpdateDatabase = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Assuming data fields match database columns
                results.forEach(async item => {
                    await db.query('INSERT INTO prices SET ?', item, (error, results) => {
                        if (error) reject(error);
                    });
                });
                resolve();
            });
    });
};

module.exports = {
    parseCSVAndUpdateDatabase
};