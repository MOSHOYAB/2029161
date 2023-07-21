// Train.js - Model
const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  delay: {
    type: Number,
    default: 0,
  },
  tickets: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Train', trainSchema);


