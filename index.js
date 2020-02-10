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
            if(!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
        res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })
        })
})

// add user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    } else {
        Users.insert(userInfo)
            .then(user => {
                res.status(201).json(req.body)
            }).catch(err => {
                res.status(500).json({ errorMessage: 'There was an error while saving the user to the database'})
                
            })
    }
})

// update user
server.put('/api/users/:id', (req, res) => {
    const newUser = req.body;
    const { id } = req.params;

    Users.update(id, newUser)
        .then(user => {
            if (!user) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
            } else if (!req.body.name || !req.body.bio) {
                res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'The user information could not be modified.'})
        })
})

// delete user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    let deletedUser;

    Users.findById(id).then(res => {
        deletedUser = res
    })
    
    Users.remove(id)
        .then(removed => {
            if(!removed) {
                res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.'})
            } else {
                res.status(200).json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: 'The user could not be removed'})
        })
})

const port = 5000;
server.listen(port, () => console.log(`API on port ${port}`))