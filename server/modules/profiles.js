/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profile = {};

//Create Profile
profile.create = function(user) {
    return new Profile({
        contact: {
            emailAddress: user.email,
            fullName: user.fullName
        }
    });
};

//Edit profile
profile.editById = function(id) {
    Profile.findById(id);
};

//returns all profiles
profile.getAll = function(callback) {
    Profile.find({}, callback)
};

//Query profile by emailAddress
profile.findByEmail = function(emailAddress, callback) {
    return Profile.findOne({'contact.emailAddress' : emailAddress})
        .populate('events').exec(callback);
};

//Remove a profile
profile.Remove = function(id) {
    //remove profile from all events

    //remove profile
    Profile.findbyId(id).remove();
};

module.exports = profile;