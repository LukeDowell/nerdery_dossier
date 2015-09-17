var Profile = require('../models/profile'),
    Event = require('../models/event'),
    profileBuilder = require('./profiles');

//Function will create an empty event and 3 empty profiles
var createEvent = function() {
    var newEvent = new Event();

    //Simulates iterating through a list of attendees
    for(var i = 1; i <= 3; i++) {
        //Check if profile already exists for attendee
        //Profile.find({something}, function(err, profile) { newEvent.attendees.push({profile: newProfile});}

        //Create new profile
        var newProfile = profileBuilder();
        //Add the meeting to our profile then save it to the database
        newProfile.meetings.push(newEvent);
        newProfile.save();
        //Set profile as a member of the event
        newEvent.attendees.push({profile : newProfile._id});
    }
    //Save event to the database
    newEvent.save();
};

//Will return populated event from event id - unused
var buildEventById = function(id) {
    Event.findById(id)
        .populate('attendees.profile')
        .exec(function(err, event) {
            return event;
        });
};


module.exports = createEvent;