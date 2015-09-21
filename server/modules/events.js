/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profileModule = require('./profiles'),
    event = {};


//save an event to database
event.create = function(event) {
    //Create event
    var newEvent = new Event(event);
    //Remove any events have have changes
    Event.findOne({id : event.id}, function(err, storedEvent) {
        if(err) console.log(err);
        if(storedEvent) {
            if(storedEvent.updated != event.updated) {
                storedEvent.remove();
            }
        }
    });

    //Create profiles for attendees
    if(event.attendees.length > 0) {
        for(var i = 0; i < event.attendees.length; i++) {
            var attendee = event.attendees[i];
            profileModule.findByEmail(attendee.email, function(err, profile) {
                if(err) console.log(err);
                else if(profile) {
                    profile.events.push(newEvent);
                    profile.save();
                    newEvent.profiles.push({profileId: profile._id, fullName: profile.contact.fullName, emailAddress: profile.contact.emailAddress});
                    newEvent.save();
                }
            });

            var newProfile = profileModule.create(attendee);
            newProfile.events.push(newEvent);
            newProfile.save();
            newEvent.profiles.push({profileId: newProfile._id, fullName: newProfile.contact.fullName, emailAddress: newProfile.contact.emailAddress});
            newEvent.save();
        }
    }
    return newEvent;
};

module.exports = event;