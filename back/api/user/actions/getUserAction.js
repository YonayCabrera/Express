const fs = require('fs');
const _ = require('lodash');
const { readFile, repeatEmail } = require('../../../utils/utils')
const {findUserById} = require('../repository/userRepository')

module.exports = {
    getUser: getUser
};

function getUser(req, res) {
    findUserById(req.params.idUser).then(response => res.json(response))
};