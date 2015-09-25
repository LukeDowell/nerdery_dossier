/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Profile = require('./profile'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleID: String,
    profileID: String,
    managingCalendar: String,
    emailsToIgnore: [String],
    auth: {
        accessToken: String,
        refreshToken: String
    }
});

/**
 * Attempts to find an existing user in our database based on their google id.
 * If the user does not exist/cannot be found, a new one is created.
 *
 * @param access
 *      The google api access token
 * @param refresh
 *      The google api refresh token
 * @param googleData
 *      All google data returned from the login callback
 * @param done
 *      Callback to pass information to passport
 */
UserSchema.statics.findOrCreate = function(access, refresh, googleData, done) {
    this.findOne({
            googleID: googleData.id
        },
        function(err, user) {
            if(err) {
                //Something is broken
                done(err);
            }
            if(user) {
                //We have found an existing user
                //Update access and refresh tokens if they exist
                if(access) {
                    console.log("Updating access token");
                    user.auth.accessToken = access;
                }
                if(refresh) {
                    console.log("Updating refresh token");
                    user.auth.refreshToken = refresh;
                }
                user.save(function(err) {
                    if(err) {
                        console.log("Mongoose error occured with User: " + user.googleID);
                    }
                    done(err, user);
                });
            } else {
                //No user exists
                //Build the user profile
                var userProfile = new Profile({
                    contact: {
                        emailAddress: googleData.emails[0].value,
                        givenName: googleData.name.givenName,
                        familyName: googleData.name.familyName
                    }
                });
                //Save the profile
                userProfile.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                    //Create the user
                    var newUser = new User({
                        googleID: googleData.id,
                        profileID: userProfile._id,
                        auth: {
                            accessToken: access,
                            refreshToken: refresh
                        },
                        managingCalendar: 'primary',
                        emailsToIgnore: [userProfile.contact.emailAddress]
                    });
                    //Save the user
                    newUser.save(function(err) {
                        if(err) {
                            console.log(err);
                        }
                        //Done
                        return done(err, newUser);
                    });
                });
            }
        }
    );
};

/**
 * Updates settings based on input from the 'your settings' view
 * @param user
 *      The passport user we are updating
 * @param settings
 *      The settings we are updating
 * @param callback
 *      The status callback
 */
UserSchema.statics.updateSettings = function(user, settings, callback) {
    this.findOne(user.googleID, function(err, user) {
        user.managingCalendar = settings.managingCalendar;
        user.emailsToIgnore = settings.emailsToIgnore;
        user.save(function(err) {
            callback(err);
        });
    });
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
