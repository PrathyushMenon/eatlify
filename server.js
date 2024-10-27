// server.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS
app.use(cors());

// Logging middleware
app.use(morgan('dev'));

// User and Restaurant Routes
app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Set PORT and start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log("Shutting down ...");
    server.close(() => {
        console.log('Closed all remaining connections.');
        process.exit(0);
    });
});
