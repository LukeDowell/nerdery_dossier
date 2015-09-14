/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    profile = require('./profile'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleID: String,
    authentication: {
        accessToken: String,
        refreshToken: String
    },
    profile: profile
});


var User = mongoose.model('user', UserSchema);

UserSchema.statics.findOrCreate = function(access, refresh, profile, done) {
    this.findOne({
            googleID: profile.id
        },
        function(err, result) {
            if(err) {
                //Something is broken
                done(err);
            }
            if(result) {
                //We have found an existing user
                done(err, result);
            } else {
                //No user exists
                //Create the user
                result = new User({
                    googleID: profile.id,
                    authentication: {
                        accessToken: access,
                        refreshToken: refresh
                    },
                    profile: {
                        contactInfo: {
                            givenName: profile.name.givenName,
                            familyName: profile.name.familyName,
                            emailAddress: profile.emails[0].value
                        }
                    }
                });
                //Save the user
                result.save(function(err) {
                    if(err) {
                        console.log(err);
                    }
                    return done(err, result);
                });
            }
        }
    );
};

module.exports = User;
