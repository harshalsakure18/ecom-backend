const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Ensure this model exists
const router = express.Router();

// Middleware to validate input
const validateInput = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password || (req.path === "/register" && !name)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};

// Signup Route
router.post('/register', validateInput, async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login Route
router.post('/login', validateInput, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token as a secure HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000 // 1 hour
        });

        res.json({ message: "Login successful", user: { name: user.name, email: user.email } });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
