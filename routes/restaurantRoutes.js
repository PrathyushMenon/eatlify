// routes/restaurantRoutes.js
const express = require('express');
const {
    addRestaurant,
    listRestaurants,
    searchRestaurants,
    updateRestaurant
} = require('../controllers/restaurantController');

const router = express.Router();

// Route to add a new restaurant
router.post('/add', addRestaurant);

// Route to list all restaurants
router.get('/list', listRestaurants);

// Route to search restaurants by cuisine type
router.get('/search', searchRestaurants);

// Route to update restaurant details
router.put('/update', updateRestaurant);

module.exports = router;
