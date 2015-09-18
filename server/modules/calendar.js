/**
 * Created by lukedowell on 9/17/15.
 */

var google = require('googleapis');
var config = require('../config');
var oauthClient = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);
var calendar = google.calendar('v3');

/**
 *
 * @param user
 *      The user whose calendar you want to access
 * @param callback
 *      The results callback. Takes in an error and a response, the events are located
 *      in response.items
 * @param options
 *      calendarID: The id of the calendar you want to access
 *      timeMin: I have no idea what this is yet, default is (new Date()).toIsoString()
 *      maxResults: The amount of results you want back
 *      singleEvents: Also not sure what this is.
 *      orderBy: Sorting options. The only one I know is 'startTime'
 */
function getCalendarEvents(user, callback, options) {
    var params = {};
    if(options) {
        params.calendarId = options.calendarId ? options.calendarId : 'primary';
        params.timeMin = options.timeMin ? options.timeMin : (new Date()).toISOString();
        params.maxResults = options.maxResults ? options.maxResults : 25;
        params.singleEvents = options.singleEvents ? options.singleEvents : true;
        params.orderBy = options.orderBy ? options.orderBy : 'startTime';
    } else {
        params.calendarId = 'primary';
        params.timeMin = (new Date()).toISOString();
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
 * Takes in a date and returns all event attendees to events that day
 * @param date
 *      The date
 */
function getAttendees(user, date) {

}

module.exports = {
    getCalendarEvents : getCalendarEvents
};