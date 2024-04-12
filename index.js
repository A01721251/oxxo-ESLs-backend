const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // for parsing application/json

// Import routes
const tagRoutes = require('./routes/tagRoutes');
app.use('/api/tags', tagRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
