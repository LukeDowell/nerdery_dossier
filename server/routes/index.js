/**
 * Created by lukedowell on 9/9/15.
 */
var router = require('express').Router();
var path = require('path');
var newEvent = require('../modules/events');


router.get('/test', function(req, res) {
    newEvent();
    res.send("dsdsa");
})

router.get('/*', function(req, res) {
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;