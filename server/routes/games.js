const express = require('express');
const router = express.Router();

let activeGames = []; // Array to store active game sessions

// Create a game session
router.post('/create', (req, res) => {
    const { gameId, playerName } = req.body;
    const gameSession = {
        gameId,
        players: [playerName],
        state: 'waiting'
    };
    activeGames.push(gameSession);
    res.status(201).json({ message: 'Game session created', gameSession });
});

// Get active games
router.get('/active', (req, res) => {
    res.json(activeGames);
});

// Join a game session
router.post('/join', (req, res) => {
    const { gameId, playerName } = req.body;
    const gameSession = activeGames.find(game => game.gameId === gameId);
    if (gameSession) {
        gameSession.players.push(playerName);
        res.json({ message: 'Joined game session', gameSession });
    } else {
        res.status(404).json({ message: 'Game session not found' });
    }
});

// Get game state
router.get('/:gameId/state', (req, res) => {
    const { gameId } = req.params;
    const gameSession = activeGames.find(game => game.gameId === gameId);
    if (gameSession) {
        res.json({ state: gameSession.state, players: gameSession.players });
    } else {
        res.status(404).json({ message: 'Game session not found' });
    }
});

module.exports = router;