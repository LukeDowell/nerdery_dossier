/**
 * Created by lukedowell on 9/9/15.
 */
var app = require('express')();
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var routes = require('./routes/routes');
var session = require('express-session');

/////////////////
// SETUP MONGO //
/////////////////

var MONGOOSE_URI = "mongodb://localhost/gabbys_salvation";
var database = mongoose.connect(MONGOOSE_URI);
database.on('error', console.error.bind(console, 'mongo error:'));
database.once('open', function() {
    console.log("Connected to MongoDB!");
});

////////////////////
// SETUP PASSPORT //
////////////////////

///////////////
// SETUP APP //
///////////////

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
routes.init(app);

//////////////////
// START SERVER //
//////////////////

app.listen(app.get('port'), function() {
    console.log("Server started! Listening on port: " + app.get('port'));
});