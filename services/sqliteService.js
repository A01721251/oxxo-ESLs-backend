const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Database connected.');

    // Create table
    // db.run(`CREATE TABLE IF NOT EXISTS users (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     name TEXT,
    //     email TEXT UNIQUE NOT NULL
    // )`, (err) => {
    //   if (err) {
    //     console.error('Error creating table ' + err.message);
    //   } else {
    //     console.log('Table created or already exists.');
    //   }
    // });

    const table_creation_queries = [
      `CREATE TABLE IF NOT EXISTS Tiendas (
    tienda_