/**
 * Created by mikelseverson on 9/14/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrganizationSchema = new Schema({

});


module.exports = mongoose.model('profile', OrganizationSchema);
