const mongoose = require('mongoose');

var Userschema = mongoose.Schema({
    id: String,
    username: {
        type : String,
        required : [true , 'Tienes que meter un usuario'],
        minlength : [6 , 'Minimo ponme 6 caracteres']
    },
    name: String,
    email: {
        type : String,
        required : [true , 'Tienes que meter un email'],
    },
    tweets: Array
});

var user = mongoose.model('users', Userschema);

module.exports = user; 