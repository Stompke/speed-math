const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');
const Games = require('./model');
const authenticate = require('../api/authenticate-middleware');

router.get('/', (req, res) => {
    // let id = req.decodedToken.subject
    Games.games()
        .then(allGames => {
            res.status(200).json(allGames)
        })
        .catch(err => {
            res.status(500).json({ error: "Could not retrieve games", err})
        })
})

router.get('/leaderboard', (req, res) => {
    Games.leaderboard()
        .then(leaderboard => {
            res.status(200).json(leaderboard)
        })
        .catch(err => {
            res.status(500).json({ error: "Could not retrive leaderboard data", err})
        })
})

router.post('/leaderboard', (req, res) => {
    let addGameScore = req.body;
    const {game_type, score, posted_on} = req.body;
    addGameScore.user_id = req.decodedToken.subject;
    let date = new Date().toUTCString();
    addGameScore.posted_on = date;

    Games.postLeaderboard(addGameScore)
        .then(added => {
            res.status(201).json(added)
        })
        .catch(err => {
            res.status(500).json({ error: "could not add to leaderboard", err})
        })
})

router.get('/leaderboard/filter', (req, res) => {
    let addGameScore = req.body;
    const {game_type, score, posted_on} = req.body;
    let date = new Date().toUTCString();
    addGameScore.posted_on = date;
    const user_id = req.decodedToken.subject;
    Games.filterLeaderboard({user_id})
        .then(filtered => {
            res.status(201).json(filtered)
        })
        .catch(err => {
            res.status(500).json({ error: "could not filter  leaderboard", err})
        })
})








module.exports = router;

