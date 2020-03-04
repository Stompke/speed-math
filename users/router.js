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


    Users.findBy({email})
    .first()
    .then(userEmail => {
        Users.findBy({username})
        .first()
        .then(userUsername => {
            if(userEmail) {
                res.status(200).json({ Message: "Email already taken."})
            } else if(userUsername) {
                res.status(200).json({ Message: "Username already taken."})
            } else {
                Users.add(user)
                .then(users => {
                    Users.findBy({email})
                    .first()
                    .then(user => {
                        console.log(user)
                        if( user && bcrypt.compareSync(password, user.password)) {
                            res.status(200).json({
                                id: user.id,
                                message: `Welcome ${user.username}`,
                                token: generateToken(user)
                            })
                        } else {
                            res.status(400).json({ message: "Invalid Credentials"})
                        }
                    })
                    .catch(err => {
                        res.status(500).json({ error: "Could not login", err})
                    })
                })
                .catch(err => {
                    res.status(500).json({ error: "Could not Register User"})
                })
    
            }

        })
        .catch(err => {
            res.status(500).json({ error: "Could not search through usernames", err})
        })
    })
    .catch(err => {
        res.status(500).json({ error: "Could not search through emails", err})
    })

})

router.post('/login', (req, res) => {
    let { email, password } = req.body;

    Users.findBy({email})
        .first()
        .then(user => {
            console.log(user)
            if( user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    id: user.id,
                    message: `Welcome ${user.username}`,
                    token: generateToken(user)
                })
            } else {
                res.status(400).json({ message: "Invalid Credentials"})
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Could not login", err})
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