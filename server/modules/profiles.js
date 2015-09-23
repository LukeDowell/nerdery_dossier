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
            fullName: user.displayName
        }
    });
    return newProfile;
};

//Build profile from json data
profile.build = function(data) {
    var newProfile = new Profile({
        bio: data.bio,
        contact: {
            emailAddress: data.contact.emailAddress,
            displayName: data.contact.displayName,
            physicalAddresses: data.contact.physicalAddresses,
            socialMedia: data.contact.socialMedia,
            fullName: data.contact.fullName,
            website: data.contact.website
        },
        workHistory : data.workHistory,
        affiliation : data.affiliation,
        meeting: data.meeting
    });
    newProfile.save();
    return newProfile;
};

//Update profile
profile.modify = function(updatedProfile) {
    this.findByEmail(profile.contact.emailAddress, function(err, storedProfile) {
        storedProfile = updatedProfile;
        storedProfile.save();
        return storedProfile;
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