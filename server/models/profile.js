/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    "contactInfo": {
        "familyName": {"type":"string"},
        "givenName": {"type":"string"},
        "fullName": {"type":"string"},
        "middleNames": [{ "type":"string" }],
        "websites": [ {"url": {"type":"string"}} ],
    },
    "organizations": [{
        "title": {"type":"string"},
        "name": {"type":"string"},
        "startDate": {"type":"string"},   // formatted as "YYYY-MM"
        "endDate":  {"type":"string"},    // formatted as "YYYY-MM"
        "isPrimary": {"type":"boolean"},
        "current": {"type":"boolean"} }]
});


module.exports = mongoose.model('profile', ProfileSchema);
