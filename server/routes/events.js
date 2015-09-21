/**
 * Created by mikelseverson on 9/18/15.
 */
var router = require('express').Router(),
    path = require('path');

//Models
var Event = require('../models/event'),
    Profile = require('../models/profile');

//Modules
var calendarModules = require('../modules/calendar'),
    eventModules = require('../modules/events'),
    profileModules = require('../modules/profiles');

//Returns all events
router.get('/all', function(req, res) {
    Event.find({}).populate('profiles.profileId').exec(function(err, events) {
       res.send(events);
    });
});

//Returns all events occurring on date


//Deletes event by _id

module.exports = router;