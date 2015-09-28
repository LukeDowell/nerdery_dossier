/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    bio: {
        imageUrl: {type: String, default: 'assets/images/profile.jpg'},
        interests: [{name: String}],
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
            current: Boolean
        }],
        socialMedia: {
            twitter: {handle: String, url: String},
            linkedIn: {id: String, url: String},
            facebook: {id: String, url: String},
            instagram: {id: String, url: String}
        },
        emailAddress: {type: String, unique: true},
        phoneNumber: String,
        fullName: String,
        website: String
    },
    workHistory: [{
        title: String,
        name: String,
        startDate: String,
        endDate: String,
        current: Boolean
    }],
    affiliation: [{
        name: String,
        title: String,
        summary: String
    }],
    meeting: [{
        startDate:  Date,
        note: String
    }],
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}],
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
    medical: String,
    notes: String
});

/**
 * Finds or creates a profile based on a given email address
 * @param profileData
 *      The array of profile data
 * @param callback
 *      The response callback
 */
ProfileSchema.statics.findOrCreate = function(profileData, callback) {
    this.findOne({"contact.emailAddress": profileData.contact.emailAddress}, function(err, profile) {
        if(err) {
            //o shit
            console.log(err);
        }
        if(!profile) {
            //Profile does not exist
            profile = new Profile(profileData);
            console.log(profile);
        }
        profile.save(function(err) {
            if(err) console.log(err);
            callback(err, profile);
        })
    })
};

var Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;