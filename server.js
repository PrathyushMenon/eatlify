const express = require('express');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
