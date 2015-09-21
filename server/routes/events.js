/**
 * Created by mikelseverson on 9/18/15.
 */
var router = require('express').Router();
var path = require('path');

//Models
var Event = require('../models/event'),
    Profile = require('../models/profile');

//Modules
var calendar = require('../modules/calendar');

//returns all events
router.get('/all', function(req, res) {
    Event.find({}, function(err, events) {
        res.send(events);
    });
});

router.get('/today', function(req, res) {
   calendar.getAttendees(req.user, date, function() {
       Profile.find()
   })
});

module.exports = router;