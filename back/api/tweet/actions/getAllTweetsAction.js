const { readFile, repeatEmail } = require('../../../utils/utils')
const { findAllTweets } = require('../repository/tweetRepository')
const fs = require('fs');
const _ = require('lodash');

module.exports = {
    getAll: getAll
};

function getAll(req, res) {
    return findAllTweets().then(response => {
        var users = response;
        var order = req.query.order;
        users = _.orderBy(users, ['createdAt'], [order]);
        res.json(users);
    });
}


