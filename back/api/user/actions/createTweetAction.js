const fs = require('fs');
const _ = require('lodash');
const { readFile, repeatEmail } = require('../../../utils/utils')

module.exports = {
    createTweet: createTweet
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