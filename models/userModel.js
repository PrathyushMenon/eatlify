// models/userModel.js
const {
    registerUser,
    authUser
} = require('../config/database');
const bcrypt = require('bcrypt');

const User = {
    // Create a new user
    create: async (userData) => {
        try {
            // Hash the password before storing
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;

            // Use the registerUser function from database.js
            await registerUser(userData.username, userData.password, userData.email, userData.phone, userData.role);
            return { success: true, message: 'User registered successfully!' };
        } catch (error) {
            throw new Error('Error registering user: ' + error.message);
        }
    },

    // Find user by username (for login and other operations)
    findByUsername: async (username) => {
        try {
            // Use the authUser function to check for user existence
            const userExists = await authUser(username, null);
            if (!userExists) {
                return null;
            }
            // Fetch user data manually if required
            const [user] = await db.query(`SELECT * FROM Users WHERE username = ?`, [username]);
            return user;
        } catch (error) {
            throw new Error('Error finding user by username: ' + error.message);
        }
    },

    // Verify user login credentials
    verifyLogin: async (username, password) => {
        try {
            const [user] = await db.query(`SELECT * FROM Users WHERE username = ?`, [username]);
            if (!user) return false;

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return false;
            }
            return user; // Return the user object if login is valid
        } catch (error) {
            throw new Error('Error verifying login credentials: ' + error.message);
        }
    }
};

module.exports = User;
