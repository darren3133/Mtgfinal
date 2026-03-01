'use strict';

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    manaCost: { type: String, required: true },
    type: { type: String, required: true },
    power: { type: Number, required: false },
    toughness: { type: Number, required: false },
});

const deckSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cards: [cardSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Deck', deckSchema);