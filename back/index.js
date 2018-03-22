const express = require('express');
const compression = require('compression');
const app = express();
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const notifier = require('node-notifier');

var corsOptions = {
    origin: 8080
}

app.use(compression())
app.use(cors(corsOptions));
app.use(express.json());

const usersRouter = require('./api/user/index');
const tweetsRouter = require('./api/tweet/index');

app.use(morgan('combined', {
    stream: fs.WriteStream('./access.log', { flags: 'a' })
}));
app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

app.listen(5000, (error) => {
    console.log("servidor escuchando en puerto 5000")
})
if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler({ log: errorNotification }))
}

function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url
    console.log(err)
    notifier.notify({
        title: title,
        message: str
    })
}