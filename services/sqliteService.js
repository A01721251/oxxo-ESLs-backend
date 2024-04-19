const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Database connected.');

    // List of SQL statements to create tables
    const tableCreationQueries = [
      `CREATE TABLE IF NOT EXISTS Tiendas (
          tienda_id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          ubicacion TEXT,
          telefono TEXT,
          region_id INTEGER,
          zona_id INTEGER
      )`,
      `CREATE TABLE IF NOT EXISTS Productos (
        producto_id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT,
        nombre TEXT NOT NULL,
        precio1 REAL,
        barcode TEXT,
        estado TEXT,
        marca TEXT,
        unidad TEXT,
        origen TEXT,
        qr_code TEXT,
        grado TEXT,
        categoria_nivel_1 TEXT,
        categoria_nivel_2 TEXT,
        categoria_nivel_4 TEXT,
        categoria_nivel_5 TEXT,
        hotline TEXT,
        personal_precio TEXT,
        precio2 REAL,
        precio3 REAL,
        precio6 REAL,
        razon_promocion TEXT,
        flag_promocion INTEGER,
        id_estante TEXT,
        nivel_estante TEXT,
        columna_estante TEXT,
        proveedor_id INTEGER,
        nombre_proveedor TEXT,
        vida_almacenamiento TEXT,
        fabricante TEXT,
        direccion_fabricante TEXT,
        campo_reservado_1 TEXT,
        campo_reservado_2 TEXT,
        campo_reservado_3 TEXT,
        campo_reservado_4 TEXT,
        campo_reservado_5 TEXT
    );`,
      `CREATE TABLE IF NOT EXISTS Etiquetas (
        etiqueta_id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto_id INTEGER,
        tienda_id INTEGER,
        ultima_actualizacion TIMESTAMP,
        FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
        FOREIGN KEY (tienda_id) REFERENCES Tiendas(tienda_id)
    );`,
      `CREATE TABLE IF NOT EXISTS PreciosHistoricos (
        precio_historico_id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto_id INTEGER,
        precio_anterior REAL,
        precio_nuevo REAL,
        fecha_cambio TIMESTAMP,
        FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)
    );`,
      `CREATE TABLE IF NOT EXISTS Consolidado (
        tienda_id INTEGER,
        producto_id INTEGER,
        etiqueta_id INTEGER,
        precio_historico_id INTEGER,
        nombre_tienda TEXT,
        ubicacion_tienda TEXT,
        nombre_producto TEXT,
        precio_actual REAL,
        estado_etiqueta TIMESTAMP,
        precio_anterior REAL,
        precio_nuevo REAL,
        fecha_cambio_precio TIMESTAMP,
        FOREIGN KEY (tienda_id) REFERENCES Tiendas(tienda_id),
        FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
        FOREIGN KEY (etiqueta_id) REFERENCES Etiquetas(etiqueta_id),
        FOREIGN KEY (precio_historico_id) REFERENCES PreciosHistoricos(precio_historico_id)
    );`,
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
      )`
    ];

    tableCreationQueries.forEach(sql => {
      db.run(sql, (err) => {
        if (err) {
          console.error('Error creating table: ' + err.message);
        } else {
          console.log('Table created or already exists.');
        }
      });
    });
  }
});

// Function to close the database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
  });
}

module.exports = {
  closeDatabase
};
