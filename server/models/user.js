/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Profile = require('./profile'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    googleID: String,
    profileID: String,
    auth: {
        accessToken: String,
        refreshToken: String
    },
    profile: {type: Schema.Types.ObjectId, ref: 'Profile'}
});

UserSchema.statics.findOrCreate = function(access, refresh, googleData, done) {
    this.findOne({
            googleID: googleData.id
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
                    result = new User({
                        googleID: googleData.id,
                        profileID: userProfile._id,
                        auth: {
                            accessToken: access,
                            refreshToken: refresh
                        }
                    });
                    //Save the user
                    result.save(function(err) {
                        if(err) {
                            console.log(err);
                        }
                        //Done
                        return done(err, result);
                    });
                });
            }
        }
    );
};

var User = mongoose.model('User', UserSchema);
module.exports = User;
