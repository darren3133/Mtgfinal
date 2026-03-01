const express = require('express');
const router = express.Router();

// Mock database
let decks = [];
let currentId = 1;

// Create a new deck
router.post('/', (req, res) => {
    const newDeck = {
        id: currentId++,
        userId: req.body.userId,
        name: req.body.name,
        cards: req.body.cards
    };
    decks.push(newDeck);
    res.status(201).json(newDeck);
});

// Get all decks for a user
router.get('/user/:userId', (req, res) => {
    const userDecks = decks.filter(deck => deck.userId === req.params.userId);
    res.json(userDecks);
});

// Get a single deck by ID
router.get('/:id', (req, res) => {
    const deck = decks.find(d => d.id === parseInt(req.params.id));
    if (!deck) return res.status(404).send('Deck not found.');
    res.json(deck);
});

// Update a deck
router.put('/:id', (req, res) => {
    let deck = decks.find(d => d.id === parseInt(req.params.id));
    if (!deck) return res.status(404).send('Deck not found.');
    deck.name = req.body.name;
    deck.cards = req.body.cards;
    res.json(deck);
});

// Delete a deck
router.delete('/:id', (req, res) => {
    const deckIndex = decks.findIndex(d => d.id === parseInt(req.params.id));
    if (deckIndex === -1) return res.status(404).send('Deck not found.');
    decks.splice(deckIndex, 1);
    res.status(204).send();
});

module.exports = router;