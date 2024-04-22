const fs = require('fs');
const parse = require('csv-parse');

const parseCSV = (filePath, callback) => {
  const updates = [];

  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
      const [productId, newPrice, storeId] = row;
      updates.push({ productId, newPrice, storeId });
    })
    .on('end', () => {
      callback(null, updates);
    })
    .on('error', (err) => {
      callback(err);
    });
};

module.exports = { parseCSV };