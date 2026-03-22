const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const levelRoutes = require('./routes/levels');
const authRoutes = require('./routes/auth');
const consentRoutes = require('./routes/consent');
const policiesRoutes = require('./routes/policies');
const dsarRoutes = require('./routes/dsar');
const adminRoutes = require('./routes/admin');

require('dotenv').config({ path: path.join(__dirname, '../config/.env') });

const { MONGO_URI, PORT } = process.env;
const SERVER_PORT = PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/consent', consentRoutes);
app.use('/api/policies', policiesRoutes);
app.use('/api/dsar', dsarRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/levels', levelRoutes);

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


if (process.env.NODE_ENV !== 'test') {
  app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
  });
}

module.exports = app;
