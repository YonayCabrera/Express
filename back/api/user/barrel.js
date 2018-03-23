const {getAllUser} = require('./actions/getAllUserAction')
const {createUser} = require('./actions/createUserAction')
const {createTweet} = require('./actions/createTweetAction')
const {removeTweetOfUser} = require('./actions/removeTweetOfUserAction')
const {updateUser} = require('./actions/updateUserAction')
const {removeUser} = require('./actions/removeUserAction')
const {getUser} = require('./actions/getUserAction')
const {getTweetOfUser} = require('./actions/getTweetOfUserAction')

module.exports = {
    getAllUser: getAllUser,
    createUser: createUser,
    createTweet: createTweet,
    removeTweetOfUser: removeTweetOfUser,
    updateUser: updateUser,
    removeUser: removeUser,
    getUser: getUser,
    getTweetOfUser: getTweetOfUser
};