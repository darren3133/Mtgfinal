'use strict';

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mtg', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// WebSocket connection
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log('Received: %s', message);
    });
    ws.send('Welcome to the Magic the Gathering server!');
});

// API Routes
app.get('/api/cards', (req, res) => {
    // Logic to fetch Magic the Gathering cards
    res.json({ message: 'This will return a list of cards' });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
