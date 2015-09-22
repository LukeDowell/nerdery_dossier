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

/**
 * Returns all events occuring today
 */
router.get('/today', function(req, res) {
    Event.find(
        {
            "startDate": {
                "$gte": new Date().setHours(0,0,0,0),
                "$lt": new Date().setHours(23, 59, 59, 999)
            }
        }
    ).populate('profile.profileId')
        .exec(function(err, events) {
            if(err) {
                console.log(err);
            }
            res.send(events);
        }
    );
});

module.exports = router;