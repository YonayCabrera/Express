const {removeUserById} = require('../repository/userRepository')

module.exports = {
    removeUser: removeUser
};

function removeUser(req, res) {
    return removeUserById(req.params.idUser).then(response => {
        res.json(response);
    })
};