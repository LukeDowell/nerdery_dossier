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
        console.log("event "+ i)
        for(var j = 0; j < newEvent.attendees.length; j++) {
            console.log(j);
            //find preexisting profile
            Profile.findOne({'contact.emailAddress' : newEvent.attendees[j].email}, function(err, profile) {
                if(err) console.log(err);
                if(profile == null) {
                    console.log("no profile already exists");
                }
                else {
                    console.log(profile);
                }
            });

            //create profile if none found


            //push profile to event


            //push meeting to profile


            //save


            //Profile.findOne({'contact.emailAddress' : newEvent.attendees[j].email}, function(error, profile) {
            //    if(profile == null) {
            //        console.log("profile is null");
            //        console.log(newEvent.attendees[j]);
            //        if(newEvent.attendees[j].email && newEvent.attendees[j].displayName){
            //            profile = profileModule.create(newEvent.attendees[j]);
            //            profile.meetings.push(newEvent);
            //            profile.save(function(err) {
            //                if(err) { console.log("error at new profile save")}
            //                else {
            //                    newEvent.attendees[j].profile = profile._id;
            //                }
            //            });
            //
            //        }
            //    }
            //    else {
            //        profile.meetings.push(newEvent);
            //        profile.save(function(err) {
            //            if(err) { console.log("error at new profile save")}
            //            else {
            //                newEvent.attendees[j].profile = profile._id;
            //            }
            //        });
            //    }
            //});
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