const {readFile,repeatEmail} = require('../../utils/utils')
const fs = require('fs');
const _ = require('lodash');

module.exports = {
    getAll : getAll
};

function getAll(req, res){
    var users = readFile();
    var order = req.query.order;
    users = _.flatten(users.map(user=> user.tweets));
    users = _.orderBy(users,['createdAt'],[order])
    res.json(users);
}


