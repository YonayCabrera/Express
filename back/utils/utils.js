const fs = require('fs');
const _ = require('lodash');

function repeatEmail(users, userToCreate) {
    return _.some(users, (user) => user.email == userToCreate.email)
}

function readFile() {
    return JSON.parse(fs.readFileSync('users.json'));
}

module.exports = {
    repeatEmail : repeatEmail,
    readFile : readFile
}