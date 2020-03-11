require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authenticate = require('./authenticate-middleware');


const usersRouter = require('../users/router');
const gamesRouter = require("../games/router")

const server = express();


//middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

//routes
server.use('/api/users', usersRouter)
server.use('/api/games', authenticate, gamesRouter)


server.get('/', (res, req) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;