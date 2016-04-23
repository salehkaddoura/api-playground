var express = require('express');
var router = express.Router();
var Bear = require('../models/bear.js');

router.post('/', function(req, res) {
    var username = req.body.username;
    var pass = req.body.password;
    var email = req.body.email;

    if (typeof(username) === "undefined" ||
        typeof(pass) === "undefined" ||
        typeof(email) === "undefined") {

        res.status(400).json({ error: "undefined params" });
        return;
    }

    Bear.findOne({ username: username }, function(err, user) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        if (user) {
            res.status(400).json({ error: "username already in use" });
            return;
        }

        var newBear = new Bear();
        
        newBear.username = username;
        newBear.password = pass;
        newBear.email = email;

        newBear.save(function(err) {
            if (err) {
                res.json(err);
            } else {
                res.json(newBear);
            }
        });
    });
});

router.get('/', function(req, res) {
    var username = req.query.username;

    Bear.findOne({ username: username }).then(function(data) {
        if (!data) {
            res.status(400).json({ error: 'user not found' });
            return;
        }

        res.json(data);
    });
});

router.put('/', function(req, res) {
    var username = req.query.username;
    var newName = req.body.username;
    var query = { username: username };

    Bear.findOneAndUpdate(query, { username: newName }, { new: true }, function(err, data) {
        if (err || !data) {
            res.status(400).json({ error: 'user not found' });
            return;
        }

        res.json(data);
    });
});

module.exports = router;