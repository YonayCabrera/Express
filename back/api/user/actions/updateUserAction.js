const {updateUserById} = require('../repository/userRepository')

module.exports = {
    updateUser: updateUser
};

function updateUser(req, res) {
    return updateUserById(req.params.idUser,req).then(response => {
        res.json(response);
    })
};