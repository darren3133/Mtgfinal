const express = require('express');
const router = express.Router();

// Mock database
let users = {};

// User Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'User already exists.' });
    }
    users[username] = { password, profile: {} };
    return res.status(201).json({ message: 'User registered successfully.' });
});

// User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }
    return res.status(200).json({ message: 'Login successful.', user: { username } });
});

// Get User Profile
router.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    const user = users[username];
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ profile: user.profile });
});

// Update User Profile
router.put('/profile/:username', (req, res) => {
    const username = req.params.username;
    const user = users[username];
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }
    const { profile } = req.body;
    user.profile = { ...user.profile, ...profile };
    return res.status(200).json({ message: 'Profile updated successfully.', profile: user.profile });
});

module.exports = router;