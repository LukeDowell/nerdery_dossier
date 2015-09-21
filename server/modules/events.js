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
                    profile.meetings.push(newEvent);
                    profile.save();
                    newEvent.profiles.push(profile._id);
                    newEvent.save();
                }
            });
            var newProfile = profileModule.create(attendee);
            newProfile.meetings.push(newEvent);
            newProfile.save();
            newEvent.profiles.push(newProfile._id);
            newEvent.save();
        }
    }
    return newEvent;
};

//Return populated event from event id
event.findEvent = function(id) {
    return Event.findById(id)
        .populate('attendees.profile');
};

//Edit an event
event.editEvent = function(id) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
        })
};


module.exports = event;