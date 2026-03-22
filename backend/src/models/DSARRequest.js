const mongoose = require('mongoose');
const { Schema } = mongoose;

const dsarRequestSchema = new Schema({
  userEmail: { type: String, required: true },
  type: {
    type: String,
    enum: ['access', 'rectify', 'cancel', 'oppose'],
    required: true
  },
  details: String,
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'done'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DSARRequest', dsarRequestSchema);
