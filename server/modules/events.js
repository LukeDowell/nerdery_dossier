/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profileModule = require('./profiles'),
    calendarModule = require('./calendar'),
    event = {};


//save an event to database
event.create = function(event) {

    //Remove any events have have changes
    Event.findOne({id : event.id}, function(err, storedEvent) {
        if(err) console.log(err);
        if(storedEvent) {
            if(storedEvent.updated == event.updated) {
                console.log("last updated" + event.updated);
                return "event already exists and was last updated " + event.updated;
            }
            else {
                storedEvent.remove();
            }
        }
    });

    var newEvent = new Event(event);

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

//returns all events
event.queryEvents = function(callback) {
    return Event.find({}, callback);
};

//Will return populated event from event id
event.findEvent = function(id) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
            return event;
        });
};

//Edit an event
event.editEvent = function(id) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
        })
};

//Adds an attendee to a preexisting event
event.addAttendee = function(id, attendee) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
            event.attendees.push({profile : attendee._id});
            return event;
        });
};

//Removes an attendee from an event
event.removeAttendee = function(id, attendee) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
            return event;
        });
};

//Remove event by id
event.remove = function(id) {
    Event.findById(id).delete();
};

module.exports = event;