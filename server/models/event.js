/**
 * Created by mikelseverson on 9/16/15.
 */

var mongoose = require('mongoose'),
    Profile = require('./profile'),
    Schema = mongoose.Schema;

var async = require('async');

var EventSchema = new Schema({
    id: {type : String, unique: true},
    htmlLink: String,
    created: String,
    updated: String,
    summary: String,
    location: String,
    startDate: Date,
    endDate: Date,
    creator: {
        id: String,
        email: String,
        displayName: String,
        self: Boolean
    },
    organizer: {
        id: String,
        email: String,
        displayName: String,
        self: Boolean
    },
    attendees: [{
        id: String,
        email: String,
        displayName: String,
        organizer: Boolean,
        self: Boolean,
        resource: Boolean,
        optional: Boolean,
        responseStatus: String,
        comment: String,
        additionalGuests: Number,
        imageUrl: String,
        profileId: String
    }]
});


EventSchema.statics.findOrCreateFromGoogle = function(googleEvent, callback) {
    //Remove any events have have changes
    this.findOne({id : googleEvent.id}, function(err, event) {
        if(err) console.log(err);
        if(!event) {
            //Event does not exist
            event = new Event(googleEvent);
        }

        async.eachSeries(event.attendees, function(attendee, callback) {
            console.log(event.attendees)
            var profile = {
                contact : {
                    emailAddress : attendee.email,
                    fullName : attendee.displayName
                }
            };
            Profile.findOrCreate(profile, function(err, profile) {
                if(profile.bio.imageUrl) {
                    attendee.imageUrl = profile.bio.imageUrl;
                } else {
                    attendee.imageUrl = 'assets/images/profile.jpg';
                }

                if(profile.contact.fullName) {
                    attendee.displayName = profile.contact.fullName;
                }
                attendee.profileId = profile._id;
                callback();
            })
        }, function(err) {
            if(err) console.log(err);
            callback(event);
        });
    });
};

EventSchema.statics.findOrCreateFromMeeting = function(meeting, callback) {
    //Remove any events have have changes
    console.log(new Date(meeting.time));
    this.findOne({startTime : new Date(meeting.time)}, function(err, event) {
        console.log("event:", event);
        if(err) console.log(err);

        if(!event) {
            //Event does not exist
            console.log("creating new event");
            event = new Event({startDate:meeting.time, id:meeting.time});
        }
        event.save(function(err) {
            if(err) console.log(err);
            callback(err, event);
        })
    });
};

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;