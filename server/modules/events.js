var Profile = require('../models/profile'),
    Event = require('../models/event');


var createEvent = function() {
    var newEvent = new Event();
    for(i = 0; i < 10; i++) {
        //Check if profile already exists for attendee

        //create new profile for attendee and save it
        var newProfile = new Profile({
            contact: {
                emailAddress: "a"
            },
            bio: {
                age: i
            }
        });
        newProfile.save(function(err) {
            if(err) console.log(err);
        });

        //associate profile to event attendee
        newEvent.attendees.push({profile: newProfile});
    }
    console.log(newEvent);
    newEvent.save(function(err) {
        Event.findOne({_id:newEvent._id}).populate('attendees.profile').exec(function(err, event) {

            console.log(event.attendees);
        });
    });
    Event.find({}, function(err, events) {
       console.log(events);
    });

};

module.exports = createEvent;