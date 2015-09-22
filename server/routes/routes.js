/**
 * Created by lukedowell on 9/9/15.
 */
var index = require('./index');
var auth = require('./auth');
var events = require('./events');
var profiles = require('./profiles');

/**
 * Container for all of our routes, helps to keep our
 * app.js clean
 * @param app
 *      The express app
 */

function init(app) {
    //Cascading order
    app.use('/auth', auth);
    app.use('/events', events);
    app.use('/profiles', profiles);
    app.use('/', index);
    console.log("Routes initialized");
}

module.exports = {
    init: init
};