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
    Profile.findOne({'contact.emailAddress': email})
        .populate('events')
        .exec(function(err, profiles) {
            if(err) console.log(err);
            if(profiles) {
                res.send(profiles);
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

    //Check to see if our directory exists
    try {
        fs.mkdirSync(path.join(__dirname, "../public/assets/images/uploads/"));
    } catch(e) {
        if (e.code != 'EEXIST') {
            res.send(e);
            console.log("ERROR!" + e);
            return;
        }
    }
    var file = req.files.file;
    var is = fs.createReadStream(file.path);
    var os = fs.createWriteStream(path.join(__dirname, "../public/assets/images/uploads/", file.name));
    is.pipe(os);

    os.on('error', function(err) {
        if(err) {
            console.log(err);
        }
        res.send(err);
    });
    is.on('end', function() {
        fs.unlink(file.path, function(err) {
            if(err) {
                console.log(err);
            }
        });
        res.send("assets/images/uploads/" + file.name);
    });
});

//Creates a profile req.body.user.contact.emailAddress is required
router.post('/create', function(req, res) {
    var newProfile = req.body;
    Profile.findOrCreate(newProfile, function(err, profile) {
        if(err) console.log(err);
        if(profile.meeting.length != 0) {
            console.log("Adding to event...");
            var length = profile.meeting.length;
            for(var i = 0; i < length; i++) {
                Event.findOrCreateFromMeeting(profile.meeting[i], function(err, event) {
                    event.attendees.push({
                        displayName: profile.contact.fullName,
                        email: profile.contact.emailAddress,
                        profileId: profile._id});
                    profile.events.push(event);
                    profile.save();
                    event.save(function(err, event) {
                        if(err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            res.send(event);
                        }
                    });
                });
            }
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