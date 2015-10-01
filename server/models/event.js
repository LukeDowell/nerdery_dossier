/**
 * Created by mikelseverson on 9/16/15.
 */

var mongoose = require('mongoose'),
    Profile = require('./profile'),
    Schema = mongoose.Schema;

var async = require('async');

var EventSchema = new Schema({
    id: {type : String, unique: true},
    parentCalendar: String,
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
        profileId: {type: Schema.Types.ObjectId, ref: 'Profile'}
    }]
});


EventSchema.statics.findOrCreateFromGoogle = function(googleEvent, callback) {
    //Remove any events have have changes
    this.findOne({id : googleEvent.id}, function(err, event) {
        if(err) console.log(err);
        if(!event) { //Event does not exist
            event = new Event(googleEvent);
        }

        //Build or Associate profiles for every attendee
        async.eachSeries(event.attendees, function(attendee, callback) {
            var profile = {
                contact : {
                    emailAddress : attendee.email,
                    fullName : attendee.displayName
                }
            };
            Profile.findOrCreate(profile, function(err, profile) {
                attendee.profileId = profile._id;
                Profile.update(
                    { _id: profile._id },
                    { $addToSet: { events: event._id } }, function() {
                        callback();
                    }
                );
            })
        }, function(err) {
            if(err) console.log(err);
            callback(event);
        });
    });
};

EventSchema.statics.findOrCreateFromMeeting = function(meeting, callback) {
    this.findOne({startDate : meeting.startDate}, function(err, event) {
        if(err) console.log(err);
        if(!event) {
            console.log("Creating new event at time: " + meeting.startDate);
            event = new Event({startDate:meeting.startDate, id:meeting.startDate});
        } else {
            console.log("Found old event!");
        }
        callback(err, event);
    });
};

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;