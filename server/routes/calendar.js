/**
 * Created by lukedowell on 9/16/15.
 */

var router = require('express').Router();
var google = require('googleapis');
var config = require('../config');
var oauthClient = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);
var calendar = google.calendar('v3');

/**
 * Requests all calendar events from the current logged in
 * user and returns them as JSON objects
 */
router.get('/events', function(req, res){
    //Check if authenticated
    if(req.isAuthenticated()) {
        //Set the OAuth credentials to the current user's tokens
        oauthClient.setCredentials({
            access_token: req.user.auth.accessToken,
            refresh_token: req.user.auth.refreshToken
        });
        //List the events
        calendar.events.list({
            auth: oauthClient,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        }, function(err, response) {
            if(err) {
                //Oh dayum
                console.log('The API returned an error: ' + err);
                res.send(err);
                return;
            }
            var events = response.items;
            res.send(events);
        });
    } else {
        //If not authenticated, send them to the login page
        res.redirect('/auth');
    }
});

module.exports = router;