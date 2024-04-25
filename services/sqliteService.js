const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./services/oxxo_db_v3.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Database connected.');

    // List of SQL statements to create tables
    const tableCreationQueries = [
      `CREATE TABLE IF NOT EXISTS tiendas (
        tienda_id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        ubicacion TEXT,
        telefono TEXT,
        region_id INTEGER,
        zona_id INTEGER
      );`,
      `CREATE TABLE IF NOT EXISTS productos (
        producto_id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT,
        nombre TEXT NOT NULL,
        categoria TEXT,
        proveedor_id INTEGER
      );`,
      `CREATE TABLE IF NOT EXISTS etiquetas (
        etiqueta_id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto_id INTEGER,
        tienda_id INTEGER,
        FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
        FOREIGN KEY (tienda_id) REFERENCES Tiendas(tienda_id)
    );`,
      `CREATE TABLE IF NOT EXISTS precios_historicos (
        precio_historico_id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto_id INTEGER,
        precio REAL,
        fecha_cambio TIMESTAMP,
        FOREIGN KEY (producto_id) REFERENCES Productos(producto_id)
    );`,
      `CREATE TABLE IF NOT EXISTS precio_actual (
        tienda_id INTEGER,
        producto_id INTEGER,
        etiqueta_id INTEGER,
        precio_actual REAL,
        FOREIGN KEY (tienda_id) REFERENCES Tiendas(tienda_id),
        FOREIGN KEY (producto_id) REFERENCES Productos(producto_id),
        FOREIGN KEY (etiqueta_id) REFERENCES Etiquetas(etiqueta_id)
    );`,
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('admin', 'user'))
      )`,
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
