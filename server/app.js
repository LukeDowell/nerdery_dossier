/**
 * Created by lukedowell on 9/9/15.
 */
var app = require('express')();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var routes = require('./routes/routes');
var session = require('express-session');
var User = require('./models/user');

/////////////////
// SETUP MONGO //
/////////////////

var MONGOOSE_URI = "mongodb://admin:cribbage@ds051543.mongolab.com:51543/nerderydossier";
mongoose.connect(MONGOOSE_URI);
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'mongo error:'));
database.once('open', function() {
    console.log("Connected to MongoDB!");
});

////////////////////
// SETUP PASSPORT //
////////////////////

passport.use(new GoogleStrategy({
        clientID: process.env.client_id,
        clientSecret: process.env.client_secret,
        callbackURL: process.env.callback
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(accessToken, refreshToken, profile, done);
    }
));

passport.serializeUser(function(user, callback) {
   callback(null, user._id);
});

passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
        callback(err, user);
    });
});

///////////////
// SETUP APP //
///////////////

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.session_secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 99999999
    }
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