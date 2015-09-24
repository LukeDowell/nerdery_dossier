var router = require('express').Router(),
    path = require('path'),
    fs = require('fs'),
    multiparty = require('connect-multiparty')();

//Models
var Event = require('../models/event'),
    Profile = require('../models/profile');

//Returns profile associated to email
router.get('/find/:email', function(req, res) {
    var email = req.params.email;
    Profile.findOne({'contact.emailAddress': email}, function(err, profile) {
        if(err) console.log(err);
        if(profile) {
            console.log(profile);
            res.send(profile);
        } else {
            res.status('404').send("Profile not found");
        }
    })
});

//Removes profile with email address
router.get('/remove/:email', function(req, res) {
    Profile.findOne({'contact.emailAddress': req.params.emailAddress}, function(err, profile) {
        if(err) console.log(err);
        profile.remove();
    })
});

//
router.put('/update', function(req, res) {
    Profile.findByIdAndUpdate(req.body._id, req.body, function(err, profile) {
        if(err) console.log(err);
        res.send(profile);
    })
});

//Handles saving an uploaded image
router.post('/image', multiparty, function(req, res){
    var file = req.files.file;
    var is = fs.createReadStream(file.path);
    var os = fs.createWriteStream(path.join(__dirname, "../public/assets/images/uploads/", file.name));
    is.pipe(os);

    is.on('error', function(err) {
        if(err) console.log(err);
        res.send(err);
    });

    is.on('end', function() {
        fs.unlink(file.path, function(err) {
            console.log(err);
        });
        res.send("assets/images/uploads/" + file.name);
    });
});

//Creates a profile req.body.user.contact.emailAddress is required
router.post('/create', function(req, res) {
    var newProfile = req.body.profile;
    console.log(newProfile);
    Profile.findOrCreate(newProfile, function(err, profile) {
        if(err) console.log(err);
        else if(newProfile.meeting) {
            Event.findOrCreateFromMeeting(newProfile.meeting, function(err, event) {
                event.attendees.push({
                    displayName: newProfile.contact.fullName,
                    email: newProfile.contact.emailAddress,
                    profileId: newProfile._id});
                event.save();
                res.send(profile);
            });
        }
        else {
            res.send(profile);
        }
    });
});

//Returns all profile objects with populated meeting information
router.get('/', function(req, res) {
    Profile.find({}).populate('events').exec(function(err, profiles) {
        res.send(profiles);
    })
});

module.exports = router;