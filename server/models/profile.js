/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    bio: {
        photo: [String],
        interests: [String],
        summary: String,
        demographics: String,
        age: Number,
        birthday: String,
        gender: String
    },
    contact: {
        physicalAddresses: [{
            street:{type:String},
            city:{type:String},
            state:{type:String},
            zipCode:{type:Number},
            current:Boolean}],
        socialMedia: {
            twitter: {handle: String, url: String},
            linkedIn: {id: String, url: String},
            facebook: {id: String, url: String},
            instagram: {id: String, url: String}
        },
        emailAddress: {type: String, index: true, unique: true},
        displayName:  String,
        givenName:    String,
        middleName:   String,
        familyName:   String,
        fullName:     String,
        websites:    [{name:{type:String}, url:{type:String}}]
    },
    organizations: [{
        title:     {type: String},
        name:      {type: String},
        startDate: {type: String},
        endDate:   {type: String},
        isPrimary: {type: Boolean},
        current:   {type: Boolean}
    }],
    affiliation: [{
        charity: [{name: String, title: String, summary: String}],
        NFP: [{name: String, title: String, summary: String}],
        group: [{name: String, title: String, summary: String}]
    }],
    meetings: [{type: Schema.Types.ObjectId, ref: 'Event'}],

    education: [{
        institution: String,
        startDate: String,
        endDate: String,
        type: String,
        degree: String,
        diplomaReceived: Boolean
    }],
    relationships: [{
        Name: {},
        familyMember: Boolean,
        grandParent: Boolean,
        parent: Boolean,
        spouse: Boolean,
        child: Boolean,
        summary: String
    }],
    newsCoverage: [{
        personal: {summary: String, url: String},
        company: {summary: String, url: String}
    }],
    medical: {
        summary: String,
        complications: String,
        physicalCharacteristics: String
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);