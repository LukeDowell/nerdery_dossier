/**
 * Created by lukedowell on 9/9/15.
 */
var router = require('express').Router();
var path = require('path');

router.get('/*', function(req, res) {
    if(req.isAuthenticated()) {
        var file = req.params[0] || "assets/views/index.html";
        res.sendFile(path.join(__dirname, "../public", file));
    } else {
        res.redirect('/auth');
    }
});

module.exports = router;