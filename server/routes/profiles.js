var router = require('express').Router();
var path = require('path');

router.post('/images', function(req, res){
    console.log("The image uploads are now posting");
    res.send("Thank you for uploading your image");

});

router.post('/new', function(req, res) {
    console.log("Hey we have post");
    res.send("Your new profile has successfully been created");

});



module.exports = router;