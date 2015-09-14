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

router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/failed'
    }),
    function (req, res) {
        res.redirect('/home');
    }
);

module.exports = router;