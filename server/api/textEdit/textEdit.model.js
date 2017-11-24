var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var textEditSchema = new Schema({
  text_id: String, //Descripitive name to identify where the text should be located, e.g celebrationTxtTestimonial
  literalText: String, //Actual text
});


var TextEdit = mongoose.model('TextEdit', textEditSchema);

module.exports = TextEdit;
