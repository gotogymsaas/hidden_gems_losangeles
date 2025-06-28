const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const levelRoutes = require('./routes/levels');
require('dotenv').config();

const { MONGO_URI, PORT = 5000 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());
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
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
