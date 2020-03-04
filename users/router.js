const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');
const Users = require('./model');

router.get('/', (req, res) => {
    Users.all()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "Could not get users"})
    })
})

router.post('/', (req, res) => {
    let user = req.body;
    const { password, email, username } = req.body;

    const hash = bcrypt.hashSync(password, 8);
    user.password = hash;

    Users.add(user)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "Could not get users"})
    })
})





module.exports = router;

function generateToken(user){
    const payload = {
        subject: user.id,
        email: user.email,
        username: user.username,
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options);
}