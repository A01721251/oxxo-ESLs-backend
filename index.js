const express = require('express');
const app = express();
const cors = require("cors"); // Importa CORS
require("dotenv").config();

// Configuración de CORS para permitir solicitudes desde el origen del frontend
app.use(
  cors({
    // origin: "http://localhost:3000", CASA
    // origin: "exp://192.168.0.253:8081", OFINCA CYM APP
    // origin: "exp://192.168.1.18:8081", CASA APP
    origin: "*",
  })
);

// Routes
const routes = require('./routes/indexRoutes');

// Middlewares
app.use(express.json()); // for parsing application/json

// Import routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
