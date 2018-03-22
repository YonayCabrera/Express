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
    var user = users.find(user => user.id == id);
    res.json(user);
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

app.get('/users/:idUser/tweets/:idTweet', (req, res) => {
    var users = readFile();
    const idUser = req.params.idUser;
    const idTweet = req.params.idTweet;
    var user = users.find(usuario => usuario.id == idUser)
    var tweet = user.tweets.find(tweet => tweet.id == idTweet)
    res.json(tweet);
});

app.get('/tweets', (req, res) => {
    var users = readFile();
    var order = req.query.order;
    users = _.flatten(users.map(user=> user.tweets));
    users = _.orderBy(users,['createdAt'],[order])
    res.json(users);
});

app.post('/users/:id/tweets', (req, res) => {
    const id = req.params.id;
    var tweet = {};
    var usersArray = readFile();
    var user = usersArray.find(usuario => usuario.id == id)
    tweet.id = user.email + Date.now();
    tweet.owner = user.name;
    tweet.createdAt = Date.now();
    tweet.text = req.body;
    usersArray.find(usuario => usuario.id == id).tweets.push(tweet);
    fs.writeFileSync('users.json', JSON.stringify(usersArray))
    res.json(usersArray)
});

app.delete('/users/:idUser/tweets/:idTweet', (req, res) => {
    const idUser = req.params.idUser;
    const idTweet = req.params.idTweet;
    var usersArray = readFile();
    var user = usersArray.find(usuario => usuario.id == idUser)
    var index = usersArray.indexOf(user);
    user = user.tweets.filter(tweet => tweet.id != idTweet)
    usersArray[index].tweets = user;
    fs.writeFileSync('users.json', JSON.stringify(usersArray));
    res.json(usersArray);
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