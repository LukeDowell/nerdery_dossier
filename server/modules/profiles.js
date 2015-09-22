/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profile = {};

//Create Profile from event object
profile.create = function(user) {
    var newProfile = new Profile({
        contact: {
            emailAddress: user.email,
            fullName: user.fullName
        }
    });
    return newProfile;
};

//Build profile from json data
profile.build = function(data) {
    var newProfile = new Profile({
        contact: {
            emailAddress: data.contact.emailAddress,
            displayName: data.contact.displayName
        }
    });
    return newProfile;
};

//Update profile
profile.modify = function(updatedProfile) {
    this.findByEmail(profile.contact.emailAddress, function(err, storedProfile) {
        storedProfile = updatedProfile;
        storedProfile.save();
    })
};

//Returns all profiles
profile.getAll = function(callback) {
    Profile.find({}, callback)
};

//Query profile by emailAddress
profile.findByEmail = function(emailAddress, callback) {
    return Profile.findOne({'contact.emailAddress' : emailAddress})
        .populate('events').exec(callback);
};

module.exports = profile;