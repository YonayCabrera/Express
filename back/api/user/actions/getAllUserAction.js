const fs = require('fs');
const { readFile, repeatEmail } = require('../../../utils/utils')
const { findAllUsers } = require('../repository/userRepository')

module.exports = {
    getAllUser: getAllUser
};

function getAllUser(req, res) {
    findAllUsers().then(response=>res.json(response))
};
















