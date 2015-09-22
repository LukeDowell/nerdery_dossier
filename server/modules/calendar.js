/**
 * Created by lukedowell on 9/17/15.
 */

var google = require('googleapis');
var config = require('../config');
var oauthClient = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);
var calendar = google.calendar('v3');
var Event = require('../models/event');

/**
 * Contains Date objects referring to
 * useful times
 * @type {{today_start, today_end}}
 */
var time = {

    //The beginning of today
    today_start: (new Date().setHours(0, 0, 0, 0)),

    //Today, right meow
    today: (new Date()),

    //The end of today
    today_end: (new Date().setHours(23, 59, 59, 999))
};

/**
 * Populates all events for a given user. Called each time the user logs in
 * @param user
 */
function populateEvents(user) {
    getCalendarEvents(user, function(err, response) {
        response.items.forEach(function (googleEvent) {
            googleEvent.startDate = Date.parse(googleEvent.start.dateTime);
            googleEvent.endDate = Date.parse(googleEvent.end.dateTime);

            Event.findOrCreate(googleEvent, function (err, event) {
                console.log(event);
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
 * @param options
 *      calendarID: The id of the calendar you want to access
 *      timeMin: Lower bound for events end time
 *      timeMax: Upper bound for events end time
 *      maxResults: The amount of results you want back
 *      singleEvents: Also not sure what this is.
 *      orderBy: Sorting options. The only one I know is 'startTime'
 */
function getCalendarEvents(user, callback, options) {
    var params = {};
    if(options) {
        params.calendarId = options.calendarId ? options.calendarId : 'primary';
        params.timeMin = options.timeMin ? options.timeMin : (new Date()).toISOString();
        params.timeMax  = options.timeMax ? options.timeMax : undefined;
        params.maxResults = options.maxResults ? options.maxResults : 25;
        params.singleEvents = options.singleEvents ? options.singleEvents : true;
        params.orderBy = options.orderBy ? options.orderBy : 'startTime';
    } else {
        params.calendarId = 'primary';
        params.timeMin = (new Date()).toISOString();
        params.timeMax = undefined;
        params.maxResults = 25;
        params.singleEvents = true;
        params.orderBy = 'startTime';
    }
    oauthClient.setCredentials({
         access_token: user.auth.accessToken,
         refresh_token: user.auth.refreshToken
    });
    return calendar.events.list(
        {
            auth: oauthClient,
            calendarId: params.calendarId,
            timeMin: params.timeMin,
            maxResults: params.maxResults,
            singleEvents: params.singleEvents,
            orderBy: params.orderBy
        },
        callback
    );
}

/**
 * Takes in a date and returns all event attendees to events that occur
 * on that day
 * @param user
 *      The user whose calendar we are accessing
 * @param date
 *      The date that the events occur
 */
function getAttendees(user, date, callback) {
    var dayStart = date.setHours(0,0,0,0);
    var dayEnd = date.setHours(23, 59, 59, 999);
    getCalendarEvents(user,
        callback,
        {
            timeMin: dayStart,
            timeMax: dayEnd
        }
    )
}

module.exports = {
    getCalendarEvents : getCalendarEvents,
    getAttendees : getAttendees,
    populateEvents: populateEvents,
    time : time
};