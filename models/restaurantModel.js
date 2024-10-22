const db = require('../config/db');

const Restaurant = {
    create: (data, callback) => {
        const query = `INSERT INTO Restaurants (owner_id, name, address) VALUES (?, ?, ?)`;
        db.query(query, [data.owner_id, data.name, data.address], callback);
    },
    getAll: (callback) => {
        db.query(`SELECT * FROM Restaurants`, callback);
    }
};

module.exports = Restaurant;
