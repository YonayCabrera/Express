const tweet = require('../model/tweet')

module.exports = {
    findAllTweets: findAllTweets
};

function findAllTweets() {
    return tweet.find({}, (err, res) => {
        return res;
    }).exec()
}