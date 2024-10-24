// models/restaurantModel.js
const db = require('../config/db');

const Restaurant = {
    // Create a new restaurant using stored procedure
    create: (data, callback) => {
        const query = `CALL add_restaurant(?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [data.owner_id, data.name, data.address, data.phone_number, data.cuisine_type, data.opening_time, data.closing_time], callback);
    },
    
    // Retrieve all restaurants
    getAll: (callback) => {
        db.query(`SELECT * FROM Restaurants`, callback);
    },

    // Search for restaurants by cuisine type using stored procedure
    search: (cuisineType, callback) => {
        const query = `CALL search_restaurants(?)`;
        db.query(query, [cuisineType], callback);
    },

    // Update restaurant details using stored procedure
    update: (data, callback) => {
        const query = `CALL update_restaurant(?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [data.restaurant_id, data.name, data.address, data.phone_number, data.cuisine_type, data.opening_time, data.closing_time], callback);
    }
};

module.exports = Restaurant;
