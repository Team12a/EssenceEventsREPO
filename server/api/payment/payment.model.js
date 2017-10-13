var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var paymentSchema = new Schema({
  userId: String,
  description: String,
  dueDate: String,
  amount: Number,
  paid: Boolean
});

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
