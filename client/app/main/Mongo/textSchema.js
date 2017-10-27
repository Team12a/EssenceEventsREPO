var mongoose = require('mongoose'),  
    Schema = new mongoose.Schema;
    
var textSchema = new Schema({  
        location: { type: String, required: true, unique: true },
        literalText: { type: String, required: true }
});

var textModel = mongoose.model('Texts', textSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Texts;
  