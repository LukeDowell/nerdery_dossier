/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/*
 The following is a description of the Person API response schema.
 It includes every possible field, collection, and value you can expect to receive.
 Note that certain fields and collections will only appear in the response when the data is available.
 */
FullContactSchema = new Schema({
    "status":       {"type":"number"},
    "requestId":    {"type":"string"},
    "likelihood":   {"type":"number"},
    "contactInfo": {
        "familyName": {"type":"string"},
        "givenName": {"type":"string"},
        "fullName": {"type":"string"},
        "middleNames": [{
            "type":"string"}],
        "websites": [{
            "url": {"type":"string"} }],
        "chats": [{
            "handle": {"type":"string"},
            "client": {"type":"string"}}]
    },
    "demographics": {
        "locationGeneral": {"type":"string"},
        "locationDeduced": {
            "normalizedLocation": {"type":"string"},
            "deducedLocation" : {"type":"string"},
            "city" : {
                "deduced" : {"type":"boolean"},
                "name" : {"type":"string"}
            },
            "state" : {
                "deduced" : {"type":"boolean"},
                "name" : {"type":"string"},
                "code" : {"type":"string"}
            },
            "country" : {
                "deduced" : {"type":"boolean"},
                "name" : {"type":"string"},
                "code" : {"type":"string"}
            },
            "continent" : {
                "deduced" : {"type":"boolean"},
                "name" : {"type":"string"}
            },
            "county" : {
                "deduced" : {"type":"boolean"},
                "name" : {"type":"string"},
                "code" : {"type":"string"}
            },
            "likelihood" : {"type":"number"}
        },
        "age": {"type":"string"},
        "gender": {"type":"string"},
        "ageRange": {"type":"string"}
    },
    "photos": [{
        "typeId": {"type":"string"},
        "typeName": {"type":"string"},
        "url": {"type":"string"},
        "isPrimary": {"type":"boolean"}}],
    "socialProfiles": [{
        "typeId": {"type":"string"},
        "typeName": {"type":"string"},
        "id": {"type":"string"},
        "username": {"type":"string"},
        "url": {"type":"string"},
        "bio": {"type":"string"},
        "rss": {"type":"string"},
        "following": {"type":"number"},
        "followers": {"type":"number"} }],
    "digitalFootprint": {
        "topics": [{
            "value": {"type":"string"},
            "provider": {"type":"string"} }],
        "scores": [{
            "provider": {"type":"string"},
            "type": {"type":"string"},
            "value": {"type":"number"} }]
    },
    "organizations": [{
        "title": {"type":"string"},
        "name": {"type":"string"},
        "startDate": {"type":"string"},   // formatted as "YYYY-MM"
        "endDate":  {"type":"string"},    // formatted as "YYYY-MM"
        "isPrimary": {"type":"boolean"},
        "current": {"type":"boolean"} }]
});

module.exports = mongoose.model('fullcontact', FullContactSchema);
