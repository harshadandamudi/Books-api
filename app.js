const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes'); 
const dotEnv = require('dotenv')

dotEnv.config()

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Failed to connect to DB", err))

app.use('/api', bookRoutes);

module.exports = app;
