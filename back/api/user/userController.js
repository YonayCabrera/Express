const fs = require('fs');
const _ = require('lodash');
const { readFile, repeatEmail } = require('../../utils/utils')

module.exports = {
    getAll: getAll,
    createUser: createUser,
    createTweet: createTweet,
    removeTweetOfUser: removeTweetOfUser,
    updateUser: updateUser,
    removeUser: removeUser,
    getUser: getUser,
    getTweetOfUser: getTweetOfUser
};

function getAll(req, res) {
    res.json(JSON.parse(fs.readFileSync('users.json')));
};

function getUser(req, res) {
    var users = readFile();
    const id = req.params.id;

    var user = users.find(user => user.id == id);
    if (!users.some(user => user.id == id)) {
        return res.status(400).send("Este usuario no existe")
    }
    res.json(user);
};

function getTweetOfUser(req, res) {
    var users = readFile();
    const idUser = req.params.idUser;
    const idTweet = req.params.idTweet;

    var user = users.find(usuario => usuario.id == idUser)
    var tweet = user.tweets.find(tweet => tweet.id == idTweet)

    res.json(tweet);
};

function createUser(req, res) {
    var user = req.body;
    var usersArray = readFile();
    user.id = user.email;
    if (repeatEmail(usersArray, user)) {
        return res.status(400).send("Este usuario ya existe");
    }
    usersArray.push(user);
    fs.writeFileSync('users.json', JSON.stringify(usersArray))

    return res.sendStatus(200)
};

function createTweet(req, res) {
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
    return res.sendStatus(200)
};

function updateUser(req, res) {
    const id = req.params.id;
    var user = req.body;
    user.id = id;
    var usersArray = readFile();
    if (!usersArray.some(user => user.id == id)) {
        return res.status(400).send("Este usuario no existe")
    }
    usersArray.forEach(usuario => {
        if (usuario.id == id) {
            usuario.username = user.username;
            usuario.name = user.name;
            usuario.email = user.email;
            usuario.tweets = user.tweets;
        }
    });

    fs.writeFileSync('users.json', JSON.stringify(usersArray));
    return res.sendStatus(200)
};

function removeUser(req, res) {
    const id = req.params.id;
    var usersArray = readFile();
    if (!users.some(user => user.id == id)) {
        return res.status(400).send("este usuario no existe")
    }
    usersArray = usersArray.filter(user => user.id != id);

    fs.writeFileSync('users.json', JSON.stringify(usersArray));
    return res.sendStatus(200)
};

function removeTweetOfUser(req, res) {
    const idUser = req.params.idUser;
    const idTweet = req.params.idTweet;
    var usersArray = readFile();
    var user = usersArray.find(usuario => usuario.id == idUser)
    var index = usersArray.indexOf(user);
    if (!user.tweets.some(tweet => tweet.id == idTweet)) {
        return res.status(400).send("Este tweet no existe")
    }
    user = user.tweets.filter(tweet => tweet.id != idTweet)
    usersArray[index].tweets = user;

    fs.writeFileSync('users.json', JSON.stringify(usersArray));
    return res.sendStatus(200)
};


