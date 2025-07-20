const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
  action: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  dsarId: { type: Schema.Types.ObjectId, ref: 'DSARRequest' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
