/**
 * Created by lukedowell on 9/9/15.
 */
var index = require('./index');
var auth = require('./auth');

function init(app) {
    app.use('/auth', auth);
    app.use('/', index);
    console.log("Routes initialized");
}

module.exports.init = init;