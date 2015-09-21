/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    bio: {
        photo: {url: String},
        interests: [{Name: String}],
        summary: String,
        demographics: String,
        age: Number,
        birthday: String,
        gender: String
    },
    contact: {
        physicalAddresses: [{street: String, city: String, state: String, zipCode: Number, current:Boolean}],
        socialMedia: {
            twitter: {handle: String, url: String},
            linkedIn: {id: String, url: String},
            facebook: {id: String, url: String},
            instagram: {id: String, url: String}
        },
        emailAddress: String,
        givenName: String,
        middleNames: String,
        familyName: String,
        website: String
    },
    organizations: [{
        title: String,
        name: String,
        startDate: String,
        endDate: String,
        website: String,
        isPrimary: Boolean,
        current: Boolean
    }],
    affiliation: [{
        type: String,
        name: String,
        title: String,
        summary: String
    }],
    meeting: [{
        date:  String,
        time:  String,
        note: String
    }],
    education: [{
        institution: String,
        startDate: String,
        endDate: String,
        type: String,
        degree: String,
        diplomaReceived: Boolean
    }],
    relationships: [{
        name: String,
        relationship: String,
        summary: String
    }],
    newsCoverage: [{
        type: String,
        summary: String,
        url: String,
    }],
    medical: {
        summary: String,
        complications: String,
        physicalCharacteristics: String
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);