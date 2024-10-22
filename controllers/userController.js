const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.register = (req, res) => {
    const { username, password, email, phone, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create({ username, password: hashedPassword, email, phone, role }, (err, result) => {
        if (err) return res.status(500).send('Error registering user.');
        res.status(201).send({ message: 'User registered successfully.' });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err || results.length === 0) return res.status(400).send('User not found.');
        const user = results[0];

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send('Invalid password.');

        const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    });
};
