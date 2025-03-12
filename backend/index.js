require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bookRoutes = require('./routes/bookRoutes');

app.use('/api/books', bookRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

app.get('/', (req, res) => {
  res.send('backend response');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
