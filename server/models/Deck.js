const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        enum: ['Standard', 'Modern', 'Legacy', 'Commander', 'Casual'],
        required: true,
    },
    description: {
        type: String,
    },
    cards: [{
        cardID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            max: 4,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update the updatedAt field on save
deckSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Deck = mongoose.model('Deck', deckSchema);
module.exports = Deck;