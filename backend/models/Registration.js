const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  email: String,
  phone: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
