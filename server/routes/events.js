/**
 * Created by mikelseverson on 9/18/15.
 */
var router = require('express').Router(),
    path = require('path');
/**
 * Models
 */
var Event = require('../models/event'),
    Profile = require('../models/profile');

router.get('/populate', function(req, res) {
    if(req.isAuthenticated()) {

    } else {
        res.redirect('auth');
    }
});

router.get('/all', function(req, res) {
    if(req.isAuthenticated()) {
        Event.find({})
            .populate('profiles.profileId')
            .exec(function(err, events) {
                res.send(events);
            }
        );
    } else {
        res.redirect('/auth')
    }
});

/**
 * Returns all events occuring today
 */
router.get('/today', function(req, res) {
    if(req.isAuthenticated()) {
        Event.find(
            {
                "startDate": {
                    "$gte": new Date().setHours(0,0,0,0),
                    "$lt": new Date().setHours(23, 59, 59, 999)
                },
                "parentCalendar" : req.user.managingCalendar
            }
        ).populate('profile.profileId')
            .exec(function(err, events) {
                if(err) console.log(err);
                res.send(events);
            }
        );
    } else {
        res.redirect('/auth');
    }
});

module.exports = router;