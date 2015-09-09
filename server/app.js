/**
 * Created by lukedowell on 9/9/15.
 */
var app = require('express')();
var routes = require('./routes/routes');
var mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));

routes.init(app);
app.listen(app.get('port'), function() {
    console.log("Server started! Listening on port: " + app.get('port'));
});