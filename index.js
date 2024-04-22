const express = require('express');
const app = express();
require('dotenv').config();

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
