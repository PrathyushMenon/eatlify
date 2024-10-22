const Restaurant = require('../models/restaurantModel');

exports.addRestaurant = (req, res) => {
    const { owner_id, name, address } = req.body;

    Restaurant.create({ owner_id, name, address }, (err, result) => {
        if (err) return res.status(500).send('Error adding restaurant.');
        res.status(201).send({ message: 'Restaurant added successfully.' });
    });
};

exports.listRestaurants = (req, res) => {
    Restaurant.getAll((err, results) => {
        if (err) return res.status(500).send('Error fetching restaurants.');
        res.status(200).send(results);
    });
};
