/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    bio: {
        photo: String,
        interests: [{name : String}],
        summary: String,
        age: Number,
        birthday: String,
        gender: String
    },
    contact: {
        physicalAddresses: [{
            street: String,
            city: String,
            state: String,
            zipCode: Number,
            current: Boolean }],
        socialMedia: {
            twitter: {handle: String, url: String},
            linkedIn: {id: String, url: String},
            facebook: {id: String, url: String},
            instagram: {id: String, url: String}
        },
        emailAddress: {type: String, index: true, unique: true},
        fullName:     String,
        website:      String
    },
    organizations: [{
        title:     String,
        name:      String,
        startDate: String,
        endDate:   String,
        current:   Boolean
    }],
    affiliation: [{
        name: String, title: String, summary: String, type: String
    }],
    meetings: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    education: [{
        institution: String,
        startDate: String,
        endDate: String,
        summary: String
    }],
    relationships: [{
        name: String,
        relationship: String,
        summary: String
    }],
    newsCoverage: [{
        summary: String,
        url: String
    }],
    medical: String
});

module.exports = mongoose.model('Profile', ProfileSchema);