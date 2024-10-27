// controllers/restaurantController.js
const {
    addRestaurant,
    getAllRestaurants,
    searchRestaurants,
    updateRestaurant
} = require('../config/database');

// Add a new restaurant
const addNewRestaurant = async (req, res) => {
    try {
        const { owner_id, name, address, phone_number, cuisine_type, opening_time, closing_time } = req.body;

        await addRestaurant(owner_id, name, address, phone_number, cuisine_type, opening_time, closing_time);
        
        res.status(201).json({ message: 'Restaurant added successfully!' });
    } catch (error) {
        console.error('Error adding restaurant:', error);
        res.status(500).json({ error: 'Error adding restaurant: ' + error.message });
    }
};

// List all restaurants
const listRestaurants = async (req, res) => {
    try {
        const restaurants = await getAllRestaurants();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Error fetching restaurants: ' + error.message });
    }
};

// Search for restaurants by name
const searchRestaurantsByName = async (req, res) => {
    const { name } = req.query;
    try {
        const restaurants = await searchRestaurants(name);
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error searching for restaurants:', error);
        res.status(500).json({ error: 'Error searching for restaurants: ' + error.message });
    }
};

// Update restaurant details
const updateRestaurantDetails = async (req, res) => {
    const { restaurant_id, owner_id, name, address, phone_number, cuisine_type, opening_time, closing_time } = req.body;
    try {
        await updateRestaurant(restaurant_id, owner_id, name, address, phone_number, cuisine_type, opening_time, closing_time);
        res.status(200).json({ message: 'Restaurant updated successfully!' });
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ error: 'Error updating restaurant: ' + error.message });
    }
};

module.exports = { addNewRestaurant, listRestaurants, searchRestaurantsByName, updateRestaurantDetails };
