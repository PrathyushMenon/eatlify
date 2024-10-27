// controllers/userController.js
const bcrypt = require('bcrypt');
const { registerUser, authUser } = require('../config/database');

// Register a new user
const register = async (req, res) => {
    try {
        const { username, password, email, phone_number, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await registerUser(username, hashedPassword, email, phone_number, role);
        
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user: ' + error.message });
    }
};

// User login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExists = await authUser(username, password);
        
        if (!userExists) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error during login: ' + error.message });
    }
};

module.exports = { register, login };
