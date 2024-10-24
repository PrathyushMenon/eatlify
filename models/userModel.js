// models/userModel.js
const db = require('../config/db');
const bcrypt = require('bcrypt'); 

const User = {
    // Create a new user
    create: (userData, callback) => {
        const query = `INSERT INTO Users (username, password, email, phone_number, role) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [userData.username, userData.password, userData.email, userData.phone, userData.role], callback);
    },

    // Find user by username
    findByUsername: (username, callback) => {
        const query = `SELECT * FROM Users WHERE username = ?`;
        db.query(query, [username], callback);
    },

    // Verify user login credentials
    verifyLogin: async (username, password, callback) => {
        const query = `SELECT * FROM Users WHERE username = ?`;
        db.query(query, [username], async (err, results) => {
            if (err) return callback(err);
            if (results.length === 0) return callback(null, false); 

            const user = results[0];
            const isValid = await bcrypt.compare(password, user.password); 
            callback(null, isValid); 
        });
    }
};

module.exports = User;
