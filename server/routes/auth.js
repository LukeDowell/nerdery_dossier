/**
 * Created by lukedowell on 9/14/15.
 */
var router = require('express').Router();
var passport = require('passport');
var path = require('path');
var calendar = require('../modules/calendar');

/**
 * Our login page
 */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "../public", "assets/views/login.html"));
});

/**
 * Our 'login' url
 */
router.get('/login',
    passport.authenticate('google',
        {
            scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read',
                'https://www.googleapis.com/auth/calendar'
            ],
            accessType: 'offline'
        }
    )
);

/**
 * The initial google callback. Contains the authorization code
 * from google.
 */
router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth'
    }), function(req, res) {
        //Success
        //Populate events
        calendar.populateEvents(req.user);
        res.redirect('/');
    }
);

module.exports = router;