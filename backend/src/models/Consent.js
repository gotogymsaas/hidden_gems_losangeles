const mongoose = require('mongoose');
const { Schema } = mongoose;

const consentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categories: {
    necessary: Boolean,
    analytics: Boolean,
    marketing: Boolean
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consent', consentSchema);
