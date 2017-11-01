var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testimonialSchema = new Schema({
  postName: String,
  eventDescription: String,
  message: String,
});


var Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
