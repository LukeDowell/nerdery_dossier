/**
 * Created by mikelseverson on 9/16/15.
 */
var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profileModule = require('./profiles'),
    event = {};


//Function will create an empty event
event.create = function(event) {
    var newEvent = new Event(event);

    console.log(newEvent);

    //Simulates iterating through a list of attendees
    for(var i = 0; i < event.attendees.length; i++) {

        //Check if profile already exists for attendee
        //var foundProfile = profileModule.findByEmail('')

        //Create new profile
        console.log("Sending: ..... " + i , event.attendees[i])
        var newProfile = profileModule.create(event.attendees[i]);

        //Add the meeting to our profile then save it to the database
        newProfile.meetings.push(newEvent);
        newProfile.save();

        //Set profile as a member of the event
        //newEvent.attendees[i].push({profile : newProfile._id});
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

//Edit an event
event.editEvent = function(id) {
    Event.findById(id)
        .populate('atendees.profile')
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