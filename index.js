// implement your API here
const express = require('express');

const Users = require('./data/db');

const server = express();

server.use(express.json())

// Test
server.get('/', (req, res) => {
    res.json({ hello: 'Goodbye' })
})

// get users
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
        res.status(200).json(users)
    })
        .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'The users information could not be retrieved.'})
    })
})

// get a specific user
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    Users.findById(id)
        .then(user => {
        res.status(200).json(user)
    })
        .catch(err => {
        if (!id) {
            res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
        }
        res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })
    })
})

// add user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    Users.insert(userInfo)
        .then(user => {
            res.status(201).json(user)
        }).catch(err => {
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
            }
            res.status(500).json({ errorMessage: 'There was an error while saving the user to the database'})
            
        })
})

// update user
server.put('/api/users/:id', (req, res) => {
    const newUser = req.body;
    const { id } = req.params;

    Users.update(id, newUser)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            if(!id) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
            }
            if(!req.body.name || !req.body.bio) {
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
            }
            res.status(500).json({ errorMessage: 'The user information could not be modified.'})
        })
})

const port = 5000;
server.listen(port, () => console.log(`API on port ${port}`))