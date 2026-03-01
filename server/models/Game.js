const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    sessionID: {
        type: String,
        required: true,
        unique: true,
    },
    players: [{
        playerID: { type: String, required: true },
        username: { type: String, required: true },
    }],
    gameState: {
        type: String,
        enum: ['waiting', 'in-progress', 'finished'],
        default: 'waiting',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Game', gameSchema);