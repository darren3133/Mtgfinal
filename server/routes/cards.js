const express = require('express');
const router = express.Router();

// Mock database for cards
let cards = [
    { id: 1, name: 'Card One' },
    { id: 2, name: 'Card Two' },
];

// Get all cards
router.get('/', (req, res) => {
    res.json(cards);
});

// Get a single card by ID
router.get('/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));
    if (card) {
        res.json(card);
    } else {
        res.status(404).send('Card not found');
    }
});

// Create a new card
router.post('/', (req, res) => {
    const newCard = {
        id: cards.length + 1,
        name: req.body.name,
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// Search cards by name
router.get('/search', (req, res) => {
    const query = req.query.name.toLowerCase();
    const results = cards.filter(c => c.name.toLowerCase().includes(query));
    res.json(results);
});

module.exports = router;
