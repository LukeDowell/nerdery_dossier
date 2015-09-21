var router = require('express').Router();
var path = require('path');
profiles = require('../modules/profiles');


router.post('/create', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");
});

router.get('/email', function(req, res) {
    profiles.findByEmail('mkseve@gmail.com'), function(err, profile) {
        console.log(profile);
        console.log(err);
        res.send(profile);
    };
})

router.post('/remove', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");
});

router.post('/edit', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");
});

module.exports = router;