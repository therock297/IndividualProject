const mongoose = require('mongoose');

module.exports = mongoose.model('Arduinosensor', new mongoose.Schema({
  name: String,
  temparature: Number,
  timestamp: { type: Date, required: true, default: Date.now }

  
}, { collection: 'ArduinoSensor' }));


