var router = require('express').Router();
var multiparty = require('connect-multiparty')();
var path = require('path');
var fs = require('fs');

router.post('/image', multiparty, function(req, res){
    var file = req.files.file;

    var is = fs.createReadStream(file.path);
    var os = fs.createWriteStream(path.join(__dirname, "../public/assets/images/uploads/", file.name));
    is.pipe(os);

    is.on('error', function(err) {
        if(err) {
            console.log(err);
        }
    });

    is.on('end', function() {
        fs.unlink(file.path, function(err) {
            console.log(err);
        });
        res.send("assets/images/uploads/" + file.name);
    });
});

router.post('/new', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");
});



module.exports = router;