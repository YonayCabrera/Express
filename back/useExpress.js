const http = require('http');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const _ = require('lodash');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/users/:id', (req, res) => {
    var users = readFile();
    const id = req.params.id;
    res.json(users[id]);
});

app.get('/users', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('users.json')));
});


app.post('/users', (req, res) => {
    var user = req.body;
    var usersArray = readFile();
    user.id = user.email;
    if (!repeatEmail(usersArray, user)) {
        usersArray.push(user);
        fs.writeFileSync('users.json', JSON.stringify(usersArray))
    }
    res.json(usersArray)
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    var user = req.body;
    user.id = id;
    var usersArray = readFile();
    usersArray.forEach(usuario => {
        if (usuario.id == id) {
            usuario.username = user.username;
            usuario.name = user.name;
            usuario.email = user.email;
            usuario.tweets = user.tweets;
        }
    });
    fs.writeFileSync('users.json', JSON.stringify(usersArray));
    res.json(usersArray);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    var usersArray = readFile();
    usersArray = usersArray.filter(user => user.id != id);
    fs.writeFileSync('users.json', JSON.stringify(usersArray));
    res.json(usersArray);
});

app.listen(5000, (error) => {
    console.log("servidor escuchando en puerto 5000")
})

function repeatEmail(users, userToCreate) {
    return _.some(users, (user) => user.email == userToCreate.email)
}

function readFile() {
    return JSON.parse(fs.readFileSync('users.json'));
}