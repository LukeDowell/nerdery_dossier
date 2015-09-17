/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event');

//PROFILE BUILDER
var createProfile = function() {
    var newProfile = new Profile({
        contact: {
            givenName: "dsadsdsdsa",
            emailAddress: "a"
        },
        bio: {
            age: 1
        }
    });
    newProfile.save(function (err) {
        if (err) console.log(err);
    });
    return newProfile;
};

module.exports = createProfile;