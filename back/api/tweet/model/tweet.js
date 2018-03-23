const mongoose = require('mongoose');

var Tweetschema = mongoose.Schema({
    id: String,
    owner: String,
    createdAt: Number,
    text: {
        type : String,
        required : [true , 'Tienes que meter un mensage'],
        minlength : [1 , 'Minimo ponme 1 caracteres']
    }
});
var tweet = mongoose.model('tweets', Tweetschema);

module.exports = tweet;