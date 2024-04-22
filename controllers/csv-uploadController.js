const fs = require('fs');
const parse = require('csv-parse');

const parseCSV = (filePath, callback) => {
  const updates = [];

  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
      const [tienda_id, producto_id, etiqueta_id, precio_actual] = row;
      updates.push({ tienda_id, producto_id, etiqueta_id, precio_actual});
    })
    .on('end', () => {
      callback(null, updates);
    })
    .on('error', (err) => {
      callback(err);
    });
};

module.exports = { parseCSV };