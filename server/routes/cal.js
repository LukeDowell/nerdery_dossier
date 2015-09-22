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
            response.items.forEach(function(event) {
                //Convert ISO strings to date objects
                var startDate = Date.parse(event.start.dateTime);
                event.startDate = startDate;

                var endDate = Date.parse(event.end.dateTime);
                event.endDate = endDate;

                events.create(event);
            });
            res.redirect('/');
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
            else if(response.items) {
                res.send(response.items);
            }
            else {
                res.send("error");
            }
        });
    } else {
        //If not authenticated, send them to the login page
        res.redirect('/auth');
    }
});

module.exports = router;