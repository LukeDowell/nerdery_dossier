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
            emailAddress: user.email
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
profile.findByEmail = function(emailAddress) {
    Profile.findOne({'contact.emailAddress' : emailAddress})
        .populate('meetings')
        .exec(function(err, profile) {
            if(err) console.log(err);
            return profile
        });
};

//Remove a profile
profile.Remove = function(id) {
    Profile.findbyId(id).remove();
};

module.exports = profile;