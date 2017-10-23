var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testimonialSchema = new Schema({
  name: String,
  ename: String,
  message: String,
});


var Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
