var router = require('express').Router();
var path = require('path');

router.post('/new', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");
});

module.exports = router;