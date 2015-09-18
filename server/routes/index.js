/**
 * Created by lukedowell on 9/9/15.
 */
var router = require('express').Router();
var path = require('path');

/**
 * Wilcard router. Needs authentication to provide anything
 */
router.get('/*', function(req, res) {
    var dest = "assets/views/login.html";
    if(req.isAuthenticated()) {
        dest = "assets/views/index.html";
    }
    var file = req.params[0] || dest;
    res.sendFile(path.join(__dirname, "../public", file));
});

module.exports = router;