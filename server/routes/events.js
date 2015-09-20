/**
 * Created by mikelseverson on 9/18/15.
 */
var router = require('express').Router();
var path = require('path');
var Event = require('../models/event');

router.get('/all', function(req, res) {
    var parsedResponse = "";
    Event.find({}, function(err, events) {
        events.forEach(function(event, index) {
            parsedResponse += event.id + ":";
            parsedResponse += "</br>";
            parsedResponse += "</br>";

            parsedResponse += " " + event.attendees;
            parsedResponse += "</br>";
            parsedResponse += "</br>";

        });
        res.send(parsedResponse);
    });
});



router.post('/new', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new event has successfully been created");

});

module.exports = router;