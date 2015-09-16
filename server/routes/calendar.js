/**
 * Created by lukedowell on 9/16/15.
 */
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var config = require('../config');
var authClient = new OAuth2(config.CLIENT_ID, config.CLIENT_SECRET, config.CALLBACK);


function ensureOAuthClient(req, res, next) {
    if(req.isAuthenticated()) {
        if(req.user.authClient) {
            next();
        } else {
            try {

            } catch(err) {
                console.log("OAuth client generation failed! \n" + err);
            } finally {
                //Probably shouldn't just send them along
                next();
            }
        }
    } else {
        res.redirect('/auth');
    }
}