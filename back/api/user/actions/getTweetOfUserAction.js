const {findAllUsers} = require('../repository/userRepository')

module.exports = {
    getTweetOfUser: getTweetOfUser
};

function getTweetOfUser(req, res) {
    findAllUsers().then(response=>{
        const idUser = req.params.idUser;
        const idTweet = req.params.idTweet;
        var user = response.find(usuario => usuario.id == idUser)
        var tweet = user.tweets.find(tweet => tweet.id == idTweet)
        res.json(tweet);
    });
};