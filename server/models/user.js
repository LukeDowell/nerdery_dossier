/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new schema({
    givenName : {type : String}

});


module.exports = mongoose.model('user', UserSchema);
