/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profileModule = require('./profiles'),
    event = {};

event.build = function(events) {
    for(var i = 0; i < events.length; i++) {

        var newEvent = new Event(events[i]);

        for(var j = 0; j < newEvent.attendees.length; j++) {
           //Check if profile already exists for attendee
           //console.log("profile search", profileModule.findByEmail(newEvent.attendees[j].email));

            //Create new profile
            var newProfile = profileModule.create(newEvent.attendees[j]);
           //Add the meeting to our profile then save it to the database
            newProfile.meetings.push(newEvent);
            newProfile.save();
            //Set profile as a member of the event
            //newEvent.attendees.push({profile : newProfile._id});
        }

        newEvent.save();
    }
};



//Function will create an empty event
event.create = function() {
    var newEvent = new Event({
        summary: "event summary"
    });

    //Simulates iterating through a list of attendees
    for(var i = 1; i <= 1; i++) {

        //Check if profile already exists for attendee
        var foundProfile = profileModule.findByEmail('')

        //Create new profile
        var newProfile = profileModule.create();

        //Add the meeting to our profile then save it to the database
        newProfile.meetings.push(newEvent);
        newProfile.save();

        //Set profile as a member of the event
        newEvent.attendees.push({profile : newProfile._id});
    }

    //Save event to the database
    newEvent.save();

    return newEvent;
};

//Will return populated event from event id
event.findEvent = function(id) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
            return event;
        });
};

event.editEvent = function(id) {
    Event.findById(id)
        .populate('atendees.profile')
        .exec(function(err, event) {
        })
}

//Adds an attendee to a preexisting event
event.addAttendee = function(id, attendee) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
            event.attendees.push({profile : attendee._id});
            return event;
        });
};

//Removes an attendee to a preexisting event
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