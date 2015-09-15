/**
 * Created by lukedowell on 9/14/15.
 */
var router = require('express').Router();
var passport = require('passport');

/**
 * Our 'login' url
 */
router.get('/google',
    passport.authenticate('google',
        {
            scope: ['https://www.googleapis.com/auth/plus.me',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile'],
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
        failureRedirect: '/auth/failed'
    }),
    function (req, res) {
        res.redirect('/auth/success');
    }
);

/**
 * Our route for failed authorization attempts
 */
router.get('/failed', function(req, res) {
    res.send("Failed!");
});

/**
 * Our temporary route for successful login
 */
router.get('/success', function(req, res) {
    res.send("Success! Welcome, " + req.user.googleID);
});

module.exports = router;