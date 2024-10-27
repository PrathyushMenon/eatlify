// models/restaurantModel.js
const {
    addRestaurant,
    getAllRestaurants,
    searchRestaurants,
    updateRestaurant
} = require('../config/database');

const Restaurant = {
    // Create a new restaurant
    create: async (data) => {
        try {
            await addRestaurant(data.owner_id, data.name, data.address, data.phone_number, data.cuisine_type, data.opening_time, data.closing_time);
            return { success: true, message: 'Restaurant added successfully!' };
        } catch (error) {
            throw new Error('Error adding restaurant: ' + error.message);
        }
    },

    // Get all restaurants
    getAll: async () => {
        try {
            const restaurants = await getAllRestaurants();
            return restaurants;
        } catch (error) {
            throw new Error('Error fetching restaurants: ' + error.message);
        }
    },

    // Search for restaurants by name
    search: async (name) => {
        try {
            const restaurants = await searchRestaurants(name);
            return restaurants;
        } catch (error) {
            throw new Error('Error searching for restaurants: ' + error.message);
        }
    },

    // Update restaurant details
    update: async (data) => {
        try {
            await updateRestaurant(data.restaurant_id, data.owner_id, data.name, data.address, data.phone_number, data.cuisine_type, data.opening_time, data.closing_time);
            return { success: true, message: 'Restaurant updated successfully!' };
        } catch (error) {
            throw new Error('Error updating restaurant: ' + error.message);
        }
    }
};

module.exports = Restaurant;
