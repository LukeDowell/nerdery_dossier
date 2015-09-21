var router = require('express').Router();
var path = require('path');
var Profile = require('./models/profile');

router.post('/new', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");
});

module.exports = router;