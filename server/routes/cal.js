/**
 * Created by lukedowell on 9/16/15.
 */

var router = require('express').Router();


//Modules
var calendar = require('../modules/calendar'),
    events = require('../modules/events'),
    profiles = require('../modules/profiles');

/**
 * Requests all calendar events from the current logged in
 * user and returns them as JSON objects
 */
router.get('/events', function(req, res){
    //Check if authenticated
    if(req.isAuthenticated()) {
        calendar.getCalendarEvents(req.user, function(err, response) {
            if(err) {
                res.redirect('/auth/login');
            }
            var eventsArray = [];
            response.items.forEach(function(event, index) {
                console.log(event);
                var newEvent = events.create(event);
                console.log("created event #:" + index + " " + newEvent);
                eventsArray[index] = newEvent;
            });

            res.send(response.items);
        });
    } else {
        //If not authenticated, send them to the login page
        res.redirect('/auth');
    }
});

/**
 * Requests all attendees for events occuring today
 */
router.get('/attendees', function(req, res) {
    //Check if authenticated
    if(req.isAuthenticated()) {
        calendar.getAttendees(req.user, calendar.time.today, function(err, response) {
            if(err) {
                res.redirect('/auth/login');
            }
            res.send(response.items);
        });
    } else {
        //If not authenticated, send them to the login page
        res.redirect('/auth');
    }
});

module.exports = router;