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
        imageUrl: String
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
            Profile.findOrCreate(event.attendees.email, function(err, profile) {
                if(profile.bio.imageUrl) {
                    event.attendees.imageUrl = profile.bio.imageUrl;
                }
            });
        }

        //Return our event
        callback(event);
    });

    ////Create profiles for attendees
    //if(event.attendees) {
    //    if(event.attendees.length > 0) {
    //        for(var i = 0; i < event.attendees.length; i++) {
    //            var attendee = event.attendees[i];
    //            profileModule.findByEmail(attendee.email, function(err, profile) {
    //                if(err) console.log(err);
    //                else if(profile) {
    //                    profile.events.push(newEvent);
    //                    profile.save();
    //                    newEvent.profiles.push({profileId: profile._id, fullName: profile.contact.fullName, emailAddress: profile.contact.emailAddress});
    //                    newEvent.save();
    //                }
    //            });
    //
    //            var newProfile = profileModule.create(attendee);
    //            newProfile.events.push(newEvent);
    //            newProfile.save();
    //            newEvent.profiles.push({profileId: newProfile._id, fullName: newProfile.contact.fullName, emailAddress: newProfile.contact.emailAddress});
    //            newEvent.save();
    //        }
    //    }
    //}
};

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;