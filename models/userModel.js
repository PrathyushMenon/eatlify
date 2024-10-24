// models/userModel.js
const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const query = `INSERT INTO Users (username, password, email, phone_number, role) VALUES (?, ?, ?, ?, ?)`;
        db.query(query, [userData.username, userData.password, userData.email, userData.phone, userData.role], callback);
    },

    findByUsername: (username, callback) => {
        const query = `SELECT * FROM Users WHERE username = ?`;
        db.query(query, [username], callback);
    },

    verifyLogin: (username, password, callback) => {
        const query = `SELECT verify_login(?, ?) AS is_valid`;
        db.query(query, [username, password], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].is_valid);
        });
    }
};

module.exports = User;
