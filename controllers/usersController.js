const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');

// Register
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, role } = req.body;

    try {
        // User exists?
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El correo electrónico ya existe' });
        }

        let userByUsername = await User.findOne({ username });
        if (userByUsername) {
            return res.status(400).json({ msg: 'El nombre de usuario ya está en uso' });
        }

        user = new User({
            username,
            email,
            password,
            role
        });

        // Save user
        await user.save();

        // Return the JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 604800 }, (err, token) => {
            if (err) throw err;

            const userResponse = { ...user._doc };
            delete userResponse.password;

            res.json({ user: userResponse, token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Login
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Find user and if it is found we verify the password, if both cases do not meet, we return 'Invalid credentials'
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Return the JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 604800 }, (err, token) => {
            if (err) throw err;

            const userResponse = { ...user._doc };
            delete userResponse.password;

            res.json({ user: userResponse, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
};
