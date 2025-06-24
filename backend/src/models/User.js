const mongoose = require('mongoose');
 codex/crear-endpoints-de-registro-y-login-en-auth.js

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
=======
const { Schema } = mongoose;

const progressSchema = new Schema({
  nivelesCompletados: Number,
  boosters: [String]
}, { _id: false });

const userSchema = new Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  avatar: String,
  progress: progressSchema
}, { timestamps: true });
 main

module.exports = mongoose.model('User', userSchema);
