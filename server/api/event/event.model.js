var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
  userId: String,
  name: {
    type: String
  },
  date: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  location: {
    type: String
  },
  guests: [{
    name: String,
    email: String,
    phoneNumber: Number,
    partySize: Number,
    accepted: Boolean
  }],
  budget: [{
    title: String,
    amount: Number
  }],
  subcontractors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subcontractor'}]
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;