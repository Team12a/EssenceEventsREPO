var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var paymentSchema = new Schema({
  description: String,
  dueDate: String,
  amount: Number,
  userId: String,
  paid: Boolean
});

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
