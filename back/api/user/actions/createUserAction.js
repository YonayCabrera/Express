const {saveUser} = require('../repository/userRepository')

module.exports = {
    createUser: createUser
};

function createUser(req, res) {
    var user = req.body;
    user.id = req.body.email + Date.now();
    return saveUser(user).then(response => {
        res.json(response);
    })
};