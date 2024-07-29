const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000 || process.env.PORT;
const db = require('./config/mongoose'); // Assuming this connects to MongoDB using Mongoose

// Middleware
app.use(express.json()); // Built-in body parser for JSON
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/', require('./routes'));

// Start server
app.listen(port, (err) => {
    if (err) {
        console.error("Error starting server:", err);
    }
    console.log(`Server is running on http://localhost:${port}`);
});
