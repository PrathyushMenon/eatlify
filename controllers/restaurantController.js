// controllers/restaurantController.js
const Restaurant = require('../models/restaurantModel');

// Add a new restaurant
const addRestaurant = (req, res) => {
    const restaurantData = req.body;
    Restaurant.create(restaurantData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Restaurant added successfully!', restaurantId: result.insertId });
    });
};

// List all restaurants
const listRestaurants = (req, res) => {
    Restaurant.getAll((err, restaurants) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(restaurants);
    });
};

// Search for restaurants by cuisine type
const searchRestaurants = (req, res) => {
    const cuisineType = req.query.cuisineType || null; // Optional query param
    Restaurant.search(cuisineType, (err, restaurants) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(restaurants);
    });
};

// Update restaurant details
const updateRestaurant = (req, res) => {
    const restaurantData = req.body;
    Restaurant.update(restaurantData, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Restaurant updated successfully!' });
    });
};

module.exports = { addRestaurant, listRestaurants, searchRestaurants, updateRestaurant };
