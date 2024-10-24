// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register a new user
const register = async (req, res) => {
    try {
        const userData = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword; // Update password to hashed version

        User.create(userData, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'User registered successfully!', userId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user: ' + error.message });
    }
};

// User login
const login = async (req, res) => {
    const { username, password } = req.body;
    User.findByUsername(username, async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful', userId: user.user_id });
    });
};

module.exports = { register, login };
