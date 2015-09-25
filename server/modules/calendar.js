/**
 * Created by lukedowell on 9/17/15.
 */

var google = require('googleapis');
var config = require('../config');
var oauthClient = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);
var calendar = google.calendar('v3');
var Event = require('../models/event');

/**
 * Populates all events for a given user. Called each time the user logs in
 * @param user
 */
function populateEvents(user) {
    getCalendarEvents(user, function(err, response) {
        if(err) {
            console.log(err);
            return;
        }
        response.items.forEach(function (googleEvent) {
            googleEvent.startDate = googleEvent.start.dateTime;
            googleEvent.endDate = googleEvent.end.dateTime;


            Event.findOrCreateFromGoogle(googleEvent, function (event) {
                //Add the owner of the event
                event.parentCalendar = user.managingCalendar;
                event.save(function (err) {
                    if(err) {
                        console.log(err);
                    }
                });
            });
        });
    });
}

/**
 *
 * @param user
 *      The user whose calendar you want to access
 * @param callback
 *      The results callback. Takes in an error and a response, the events are located
 *      in response.items
 */
function getCalendarEvents(user, callback) {
    var date = new Date();
    date.setHours(0,0,0,0);
    var todayStartISO = date.toISOString();

    oauthClient.setCredentials({
         access_token: user.auth.accessToken,
         refresh_token: user.auth.refreshToken
    });
    return calendar.events.list(
        {
            auth: oauthClient,
            calendarId: user.managingCalendar,
            timeMin: todayStartISO,
            maxResults: 50,
            singleEvents: true,
            orderBy: "startTime"
        },
        callback
    );
}

module.exports = {
    populateEvents: populateEvents
};