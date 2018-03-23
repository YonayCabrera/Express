const express = require('express');
const compression = require('compression');
const app = express();
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');


var corsOptions = {
    origin: 8080
}

mongoose.connect('mongodb://localhost/TweeterDB');

app.use(compression())
app.use(cors(corsOptions));
app.use(express.json());

const usersRouter = require('./api/user/controller/userController');
const tweetsRouter = require('./api/tweet/controller/tweetController');

app.use(morgan('combined', {
    stream: fs.WriteStream('./access.log', { flags: 'a' })
}));
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.listen(5000, (error) => {
    console.log("servidor escuchando en puerto 5000")
})
