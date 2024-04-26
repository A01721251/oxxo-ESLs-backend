const fs = require('fs');
const { parse } = require("csv-parse");

const parseCSVPrecios = (filePath, callback) => {
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

const parseCSVProductos = (filePath, callback) => {
  const updates = [];
  fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
      const [sku, nombre, categoria, proveedor_id] = row;
      updates.push({ sku, nombre, categoria, proveedor_id });
    })
    .on('end', () => {
      callback(null, updates);
    })
    .on('error', (err) => {
      callback(err);
    });
}

const parseCSVTiendas = (filePath, callback) => {
  const updates = [];
  fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
      const [nombre, ubicacion, telefono, region_id, zona_id] = row;
      updates.push({ nombre, ubicacion, telefono, region_id, zona_id });
    })
    .on('end', () => {
      callback(null, updates);
    })
    .on('error', (err) => {
      callback(err);
    });
}

const parseCSVEtiquetas = (filePath, callback) => {
  const updates = [];
  fs
    .createReadStream(filePath)
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
      const [producto_id, tienda_id] = row;
      updates.push({ producto_id, tienda_id });
    })
    .on('end', () => {
      callback(null, updates);
    })
    .on('error', (err) => {
      callback(err);
    });
}


module.exports = { parseCSVPrecios, parseCSVProductos, parseCSVTiendas, parseCSVEtiquetas};