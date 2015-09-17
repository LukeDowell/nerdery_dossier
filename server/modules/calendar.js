/**
 * Created by lukedowell on 9/17/15.
 */

var google = require('googleapis');
var config = require('../config');
var oauthClient = new google.auth.OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);
var calendar = google.calendar('v3');

/**
 *
 * @param access
 *      The access token of the user whose calendar you want to access
 * @param refresh
 *      The refresh token of the user whose calendar you want to access
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
function getCalendarEvents(access, refresh, callback, options) {
    oauthClient.setCredentials({
         access_token: access,
         refresh_token: refresh
    });
    return calendar.events.list(
        {
            auth: oauthClient,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 25,
            singleEvents: true,
            orderBy: 'startTime'
        },
        callback
    );
}

module.exports = {
    getCalendarEvents : getCalendarEvents
};