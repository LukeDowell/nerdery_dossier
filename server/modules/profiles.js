/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profile = {};

//Create Profile
profile.create = function(user) {
    var newProfile = new Profile({
        contact: {
            emailAddress: user
        }
    });
    newProfile.save(function (err) {
        if (err) console.log(err);
    });
    return newProfile;
};

//Edit a preexisting profile
profile.editById = function(id) {
    Profile.findById(id);
};

//Query profile by emailAddress
profile.findByEmail = function(emailAddress, callback) {
    Profile.findOne({'contact.emailAddress' : emailAddress})
        .populate('meetings')
        .exec(function(err, profile) {
            console.log('profile', profile)
            if(err) console.log(err);
            return profile, callback;
        });
};

//Remove a profile
profile.Remove = function(id) {
    Profile.findOne({});
};

module.exports = profile;