require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('backend response');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log(err);
  });

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
