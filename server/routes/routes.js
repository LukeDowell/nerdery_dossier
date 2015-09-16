/**
 * Created by lukedowell on 9/9/15.
 */
var index = require('./index');

var auth = require('./auth');

var profiles = require('./profiles');

function init(app) {
    app.use('/auth', auth);
    app.use('/profiles', profiles);
    app.use('/', index);
    console.log("Routes initialized");
}

module.exports.init = init;