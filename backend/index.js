require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const levelRoutes = require('./src/routes/levels');
const authRoutes = require('./src/routes/auth');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/levels', levelRoutes);

app.get('/', (req, res) => {
  res.send('Hidden Gems Los Angeles API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
