

const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const app = express();
const port = 5001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://madhav123:madhav123@cluster0.klbyxfa.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Connect to Arduino and configure data parser
const arduinoPort = new SerialPort('COM5', { baudRate: 9600 });
const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

// Connect to MQTT broker
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Subscribe to the sensor data topic
client.subscribe('/sensorData');

// Handle incoming sensor data
// Handle incoming sensor data
client.on('message', (topic, message) => {
  if (topic === '/sensorData') {
    try {
      const data = JSON.parse(message);

      // Save the data to MongoDB
      const sensorData = {
        name: 'ldr_light_sensor',
        value: parseInt(data.value),
        timestamp: new Date().getTime()
      };
      const sensorDataModel = new SensorData(sensorData);
      sensorDataModel.save((err, data) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('Data saved to MongoDB');
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});


// Start reading data from the Arduino
parser.on('data', (data) => {
  console.log(`LDR Light Sensor Value: ${data}`);
  client.publish('/sensorData', JSON.stringify({ name: 'ldr_light_sensor', value: data }));
});

// Define the SensorData model
const sensorDataSchema = new mongoose.Schema({
  name: String,
  value: Number,
  timestamp: Number
});
const SensorData = mongoose.model('SensorData', sensorDataSchema);



// Define the route to get all sensor data
app.get('/sensor-data', (req, res) => {
  SensorData.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data);
    }
  });
});

// Define the route to post sensor data
// Define the route to post sensor data
app.post('/sensor-data', (req, res) => {
  const sensorData = new SensorData({
    name: 'ldr_light_sensor',
    value: parseInt(req.body.value),
    timestamp: new Date().getTime()
  });

  sensorData.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log('Data saved to MongoDB');
      res.status(200).send(data);
    }
  });
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// const mqtt = require('mqtt');
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const Plotly = require('plotly')('madhav123', 'WP3yZNBXqpiX8NIjU9Gi');

// const app = express();
// const port = 5001;

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://madhav123:madhav123@cluster0.klbyxfa.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// // Configure middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// // Connect to Arduino and configure data parser
// const arduinoPort = new SerialPort('COM5', { baudRate: 9600 });
// const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

// // Connect to MQTT broker
// const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
// client.on('connect', () => {
//   console.log('Connected to MQTT broker');
// });

// // Subscribe to the sensor data topic
// client.subscribe('/sensorData');

// // Define variables for the Plotly graph
// let x = [], y = [], data = [];
// let graphOptions = { filename: 'ldr-light-sensor', fileopt: 'overwrite' };

// // Handle incoming sensor data
// client.on('message', (topic, message) => {
//   if (topic === '/sensorData') {
//     try {
//       const data = JSON.parse(message);

//       // Save the data to MongoDB
//       const sensorData = {
//         name: 'ldr_light_sensor',
//         value: data.value,
//         timestamp: new Date().getTime()
//       };
//       const sensorDataModel = new SensorData(sensorData);
//       sensorDataModel.save((err, data) => {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           console.log('Data saved to MongoDB');
//         }
//       });

//       // Add the data to the Plotly graph
//       x.push(new Date(sensorData.timestamp));
//       y.push(sensorData.value);
//       data = [{ x: x, y: y, type: 'scatter' }];
//       Plotly.plot('graph', data, graphOptions, (err, msg) => {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           console.log('Data added to Plotly graph');
//         }
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// });

// // Start reading data from the Arduino
// parser.on('data', (data) => {
//   console.log(`LDR Light Sensor Value: ${data}`);
//   client.publish('/sensorData', JSON.stringify({ name: 'ldr_light_sensor', value: data }));
// });

// // Define the SensorData model
// const sensorDataSchema = new mongoose.Schema({
//   name: String,
//   value: String,
//   timestamp: Number
// });
// const SensorData = mongoose.model('SensorData', sensorDataSchema);

// // Define the route to get all sensor data
// app.get('/sensor-data', (req, res) => {
//   SensorData.find({}, (err, data) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     else {
//       res.status(200).send(data);
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });

// // const express = require('express');

// // const mqtt = require('mqtt');
// // const mongoose = require('mongoose');
// // const SerialPort = require('serialport');
// // const Readline = require('@serialport/parser-readline');
// // const Plotly = require('plotly')('madhav123', 'WP3yZNBXqpiX8NIjU9Gi');

// // const app = express();
// // const port = 5001;

// // // Connect to MongoDB
// // mongoose.connect('mongodb+srv://madhav123:madhav123@cluster0.klbyxfa.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

// // // Define sensor data schema and model
// // const sensorDataSchema = new mongoose.Schema({
// //   name: String,
// //   value: Number,
// //   timestamp: Date
// // });

// // const SensorData = mongoose.model('SensorData', sensorDataSchema);

// // // Configure middleware
// // app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());
// // app.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Origin', '*');
// //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
// //   next();
// // });

// // // Connect to Arduino and configure data parser
// // const arduinoPort = new SerialPort('COM5', { baudRate: 9600 });
// // const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

// // // Connect to MQTT broker
// // const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
// // client.on('connect', () => {
// //   console.log('Connected to MQTT broker');
// // });

// // // Subscribe to the sensor data topic
// // client.subscribe('/sensorData');

// // // Define variables for the Plotly graph
// // let x = [], y = [], data = [];
// // let graphOptions = { filename: 'ldr-light-sensor', fileopt: 'overwrite' };

// // // Handle incoming sensor data
// // client.on('message', (topic, message) => {
// //   if (topic === '/sensorData') {
// //     try {
// //       const sensorData = JSON.parse(message);

// //       // Save the data to MongoDB
// //       const dataModel = {
// //         name: 'ldr_light_sensor',
// //         value: sensorData.value,
// //         timestamp: new Date().getTime()
// //       };
// //       const sensorDataModel = new SensorData(dataModel);
// //       sensorDataModel.save((err, data) => {
// //         if (err) {
// //           console.log(err);
// //         }
// //         else {
// //           console.log('Data saved to MongoDB');
// //         }
// //       });

// //       // Add the data to the Plotly graph
// //       x.push(new Date(dataModel.timestamp));
// //       y.push(dataModel.value);
// //       data = [{ x: x, y: y, type: 'scatter' }];
// //       Plotly.plot('graph', data, graphOptions);

// //       // Update the Plotly graph on the client-side using websockets
// //       x.push(new Date().getTime());
// //       y.push(sensorData.value);
// //       data = [{ x: x, y: y, type: 'scatter' }];
// //       Plotly.update('graph', data);
// //     }
// //     catch (error) {
// //       console.log(error);
// //     }
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });




