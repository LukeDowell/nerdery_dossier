/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    googleID: String,
    bio : {
        photo: [String],
        interests: [String],
        summary: String,
        demographics: String,
        age: {type: Number},
        birthday: String,
        gender: String
    },
    contactInfo: {
        emailAddress : {type: String, required : true},
        givenName: {type: String},
        middleNames: [{type: String}],
        familyName: {type: String},
        fullName: {type: String},
        websites: [{url: {type: String}}]
    },
    organizations: [{
        title: {type: String},
        name: {type: String},
        startDate: {type: String},
        endDate:  {type: String},
        isPrimary: {type: Boolean},
        current: {type: Boolean}
    }],
    meetings : [{
        date : String,
        time : String,
        notes : String
    }],
    medicalSummary: String
});

module.exports = mongoose.model('profile', ProfileSchema);