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
    start: {
        date: String,
        dateTime: String,
        timeZone: String
    },
    profiles : [{ type: Schema.ObjectId, ref: 'Profile', unique : true}],
    end: {
        date: String,
        dateTime: String,
        timeZone: String
    },
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
        profile : { type: Schema.ObjectId, ref: 'Profile' }
    }]
});



module.exports = mongoose.model('Event', EventSchema);