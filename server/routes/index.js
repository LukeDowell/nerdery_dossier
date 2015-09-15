/**
 * Created by lukedowell on 9/9/15.
 */
var router = require('express').Router();
var path = require('path');

router.get('/home', ensureAuthenticated, function(req, res) {
    res.send("You must be authenticated!");
});

router.get('/*', function(req, res) {
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));
});

/**
 * Some middleware to enforce authentication throughout our application
 * @param req
 * @param res
 * @param next
 */
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth');
    }
}

module.exports = router;