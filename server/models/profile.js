/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    googleID: String,
    bio : {
        interests : [String],
        summary : String,
        demographics : String
    },
    contactInfo: {
        "emailAddress" : {type: String, required : true},
        "familyName": {type: String},
        "givenName": {type:String},
        "fullName": {type: String},
        "middleNames": [{type: String}],
        "websites": [ {url: {type: String}} ],
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
    }]
});


module.exports = mongoose.model('profile', ProfileSchema);
