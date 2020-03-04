require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('../users/router');

const server = express();


//middleware
server.use(express.json());
server.use(cors());
server.use(helmet());

//routes
server.use('/api/users', usersRouter)


server.get('/', (res, req) => {
    res.status(200).json({ api: "up" })
})

module.exports = server;