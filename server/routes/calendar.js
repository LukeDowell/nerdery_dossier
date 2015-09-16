/**
 * Created by lukedowell on 9/16/15.
 */

var router = require('express').Router();
var google = require('googleapis');
var config = require('../config');
var oauthClient = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);
var calendar = google.calendar('v3');

router.get('/events', function(req, res){
    if(req.isAuthenticated()) {
        oauthClient.setCredentials({
            access_token: req.user.auth.accessToken,
            refresh_token: req.user.auth.refreshToken
        });
        calendar.events.list({
            auth: oauthClient,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
        }, function(err, response) {
            if(err) {
                console.log('The API returned an error: ' + err);
                res.send(err);
                return;
            }
            var events = response.items;
            res.send(events);
        });
    } else {
        res.redirect('/auth');
    }
});

module.exports = router;