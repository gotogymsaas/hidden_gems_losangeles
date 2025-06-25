const mongoose = require('mongoose');
const { Schema } = mongoose;

const progressSchema = new Schema({
  nivelesCompletados: Number,
  boosters: [String]
}, { _id: false });

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  avatar: String,
  progress: progressSchema
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
