const mongoose = require('mongoose');
const { Schema } = mongoose;

const policySchema = new Schema({
  region: { type: String, enum: ['CA', 'COL'], required: true },
  lang: { type: String, enum: ['en', 'es'], required: true },
  version: { type: Number, required: true },
  content: String,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Policy', policySchema);
