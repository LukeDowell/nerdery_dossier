/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profile = {};

//Create Profile
profile.create = function(user) {
    //for each meeting time create an event
    newProfile = new Profile({
        contact: {
            emailAddress: user.email,
            fullName: user.fullName
        }
    });

    return newProfile;
};

//Edit profile
profile.editByEmail = function(emailAddress, user) {
    Profile.findone({'contact.emailAddress' : emailAddress}, function(err, profile) {
        if(err) console.log(err);
        else if (profile) {
            console.log("Trying to edit profile by email - found email");
        }
        else {
            console.log("profile not found")
        }
    });
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