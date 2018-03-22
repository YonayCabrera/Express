const router = require('express').Router();
const controller = require('./tweetController')

router.get('/',controller.getAll);

module.exports = router;