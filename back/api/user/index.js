const router = require('express').Router();
const controller = require('./userController')

router.get('/',controller.getAll);
router.post('/',controller.createUser);
router.post('/:id/tweets',controller.createTweet);
router.delete('/:idUser/tweets/:idTweet',controller.removeTweetOfUser);
router.put('/:id',controller.updateUser);
router.delete('/:id',controller.removeUser);
router.get('/:id',controller.getUser);
router.get('/:idUser/tweets/:idTweet',controller.getTweetOfUser);

module.exports = router;