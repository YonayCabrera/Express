const router = require('express').Router();
const getAllTweets = require('../actions/getAllTweetsAction')

router.get('/',getAllTweets.getAll);

module.exports = router;