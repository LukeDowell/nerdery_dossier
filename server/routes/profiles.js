var router = require('express').Router(),
    path = require('path');

//Models
var Event = require('../models/event'),
    Profile = require('../models/profile');

//Modules
var calendarModules = require('../modules/calendar'),
    eventModules = require('../modules/events'),
    profileModules = require('../modules/profiles');

//Returns all profile objects with populated meeting information
router.get('/get', function(req, res) {
    Profile.find({}).populate('events').exec(function(err, profiles) {
        res.send(profiles);
    })
});

//Returns profile associated to email
router.get('/get/:emailAddress', function(req, res) {
    profileModules.findByEmail(req.params.emailAddress, function (err, profile) {
        res.send(profile);
    });
});

//Creates a profile req.body.user.contact.emailAddress is required
router.post('/create', function(req, res) {
    var newProfile = profileModules.create(req.body.user);
    newProfile.save();

    //does an event exist?

    //yes - add profile to event

    //no - create event, add profile, add to event

    res.send(newProfile);
});

//Removes profile with email address
router.get('/remove/:emailAddress', function(req, res) {
   profileModules.findByEmail(req.params.emailAddress, function(err, profile) {
       if(profile) {
           profile.remove();
           res.send("profile removed");
       } else {
           res.send("Profile not found with email: " + req.params.emailAddress);
       }
    });
});

module.exports = router;