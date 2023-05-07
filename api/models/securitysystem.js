const mongoose = require('mongoose');

module.exports = mongoose.model('Securitysystem', new mongoose.Schema({
  
    name: String,
    user: String,
    sensorData: Array
  }, { collection: 'securitysystem' }));