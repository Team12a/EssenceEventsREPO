var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
  userId: String,
  name: {
    type: String
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  locationName: {
    type: String
  },
  locationAdd: {
    type: String
  },
  lat: {
    type: String
  },
  lng: {
    type: String
  },
  budgetGoal: Number,
  toDoList: [{
    todo: String,
    by: Date,
    done: Boolean
  }],
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
  subcons: [{
    name: String,
    link: String
  }],
  subcontractors: [String]
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
