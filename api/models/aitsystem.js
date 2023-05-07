const mongoose = require('mongoose');

module.exports = mongoose.model('Aitsystem', new mongoose.Schema({
  
    name: String,
    user: String,
    sensorData: Array
  }, { collection: 'airsystem' }));