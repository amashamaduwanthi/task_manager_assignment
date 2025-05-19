const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbFunctions = require('../db/dbFunctions.js');

// Sign Up Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const errors = {};
        // Required check
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        // Name validation
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        if (name && !nameRegex.test(name)) {
            errors.name = 'Name must be 2–50 characters and contain only letters and spaces';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errors.email = 'Invalid email format';
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (password && !passwordRegex.test(password)) {
            errors.password = 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
        }

        // If any errors, return them
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Invalid input fields', errors });
        }


        // Check if user already exists
        const existingUser = await dbFunctions.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Create new user
        const newUser = await dbFunctions.createUser({
            name,
            email,
            password: hashedPassword
        });

        //  Generate token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, name: newUser.name },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log("Generated JWT Token:", token);
        // Return response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name
            },
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

module.exports = router;
