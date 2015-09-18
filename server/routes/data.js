/**
 * Created by mikelseverson on 9/18/15.
 */
router.get('/newEvent', function(req, res) {
    res.send(eventModule.create());
});
