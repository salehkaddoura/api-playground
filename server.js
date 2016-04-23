var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://salmondev:salmon@ds063150.mongolab.com:63150/salmon-admin');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.json({ message: 'API Playground' });
});

app.use('/v1/bears', require('./routes/bears'));

app.listen(port);
console.log('Magic happens on port: ' + port);