/**
 * Created by mikelseverson on 9/16/15.
 */

var mongoose = require('mongoose'),
    Profile = require('./profile'),
    Schema = mongoose.Schema;

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


EventSchema.statics.findOrCreate = function(googleEvent, callback) {
    //Remove any events have have changes
    this.findOne({id : googleEvent.id}, function(err, event) {
        if(err) console.log(err);
        if(!event) {
            //Event does not exist
            event = new Event(googleEvent);
        }

        //Set attendee data, imageUrl and name. Associate profile ID with attendee.
        for(var i = 0, length = event.attendees.length; i < length; i++) {
            Profile.findOrCreate(event.attendees[i].email, function(err, profile) {
                if(profile.bio.imageUrl) {
                    event.attendees[i].imageUrl = profile.bio.imageUrl;
                }
                event.attendees[i].profileId = profile._id;

                //Save if this is the last profile
                if(i == length) {
                    console.log('boop');
                    //Save our event
                    event.save(function(err) {
                        if(err) console.log(err);
                        callback(event);
                    });
                }
            });
        }
    });
};

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;