/**
 * Created by mikelseverson on 9/18/15.
 */
var router = require('express').Router();
var path = require('path');

router.post('/new', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new event has successfully been created");

});

module.exports = router;