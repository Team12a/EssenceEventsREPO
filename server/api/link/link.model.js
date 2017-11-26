var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//terrible and confusing naming semantics, like ?????
var eventSchema = new Schema({
  type: String,
  name: String,
  url: String,
  phoneNumber: String,
  photo: String
});

var Link = mongoose.model('Link', eventSchema);

module.exports = Link;
