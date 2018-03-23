const fs = require('fs');
const _ = require('lodash');
const { readFile, repeatEmail } = require('../../../utils/utils')

module.exports = {
    removeTweetOfUser: removeTweetOfUser
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