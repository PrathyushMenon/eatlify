const express = require('express');
const { addRestaurant, listRestaurants } = require('../controllers/restaurantController');
const router = express.Router();

router.post('/add', addRestaurant);
router.get('/list', listRestaurants);

module.exports = router;
