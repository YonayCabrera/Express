const user = require('../model/user')

module.exports = {
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    saveUser: saveUser,
    removeUserById: removeUserById,
    updateUserById: updateUserById
};

function findAllUsers() {
    return user.find({}, (err, res) => {
        return res;
    }).exec()
}

function findUserById(id) {
    return user.find({ "id": id }, (err, res) => {
        return res;
    }).exec()
}

function saveUser(req) {
    return user.create(req)
        .then(res => {
            return res
        })
        .catch(err => {
            return err;
        });
}

function removeUserById(id) {
    return findUserById(id).then(response => {
        return user.remove(response[0])
            .then(res => {
                return res;
            })
            .catch(err => {
                return err;
            })
    })
}

function updateUserById(id, req) {
    return user.findOneAndUpdate({ id: id }, req.body, {
        new: true,
        runValidators: true,

    })
        .then((udpdate) => {
            return udpdate;
        })
        .catch(err => {
            return err;
        })
}