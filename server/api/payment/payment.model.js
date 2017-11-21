var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var paymentSchema = new Schema({
  description: String,
  dueDate: {
    type: Date
  },
  amount: Number,
  userId: String,
  paid: Boolean
});

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
