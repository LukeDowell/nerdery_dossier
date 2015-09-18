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
        calendar.getCalendarEvents(req.user.auth.accessToken, req.user.auth.refreshToken, function(err, cal) {
            console.log(err);
            console.log(cal);
            events.build(cal.items);
            res.send(cal.items);
        });
    } else {
        //If not authenticated, send them to the login page
        res.redirect('/auth');
    }
});

module.exports = router;