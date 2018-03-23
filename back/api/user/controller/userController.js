const router = require('express').Router();
const {getAllUser,createUser, createTweet, removeTweetOfUser,
    updateUser, removeUser, getUser, getTweetOfUser} = require('../barrel')

router.get('/',getAllUser);
router.get('/:idUser',getUser);
router.get('/:idUser/tweets/:idTweet',getTweetOfUser);
router.post('/',createUser);
router.post('/:idUser/tweets',createTweet);
router.put('/:idUser',updateUser);
router.delete('/:idUser',removeUser);
router.delete('/:idUser/tweets/:idTweet',removeTweetOfUser);

module.exports = router;