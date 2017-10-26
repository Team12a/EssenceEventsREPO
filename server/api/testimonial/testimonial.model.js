var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var testimonialSchema = new Schema({
  clientName: String,
  eventDescription: String,
  message: String,
});


var Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
