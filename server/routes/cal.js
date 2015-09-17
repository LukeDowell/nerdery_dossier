/**
 * Created by lukedowell on 9/16/15.
 */

var router = require('express').Router();
var calendar = require('../modules/calendar');

/**
 * Requests all calendar events from the current logged in
 * user and returns them as JSON objects
 */
router.get('/events', function(req, res){
    //Check if authenticated
    if(req.isAuthenticated()) {
        calendar.getCalendarEvents(req.user.auth.accessToken, req.user.auth.refreshToken, function(err, response) {
           console.log(response.items);
            res.send(response.items);
        });
    } else {
        //If not authenticated, send them to the login page
        res.redirect('/auth');
    }
});

module.exports = router;