// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REGISTER OUR ROUTES
var router = require('./routes')(app);

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

// START THE SERVER
app.listen(process.env.PORT || 1337);
