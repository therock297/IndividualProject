const express = require('express');
const mongoose = require('mongoose');
const Device = require('./models/device'); 
const Aitsystem = require('./models/aitsystem');
const Securitysystem= require('./models/securitysystem');
//  const Arduinosensor= require('./models/arduinosensor');


mongoose.connect('mongodb+srv://madhav123:madhav123@cluster0.klbyxfa.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE');
  next();
});

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});



/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Devices
* @apiSuccessExample {json} Success-Response:
*  [{"sensorData":[],"_id":"6414b05a9a42e367a9d5a8b1","name":"as","user":"as","id":"5"},{"_id":"6414b05a9a42e367a9d5a8b2","name":"Bob's Samsung Galaxy","user":"bob","sensorData":[{"ts":"1529545935","temp":14,"loc":{"lat":-37.839587,"lon":145.101386}}],"id":"4"},{"_id":"6415a6512464c3a58d24bb9c","name":"madhav123","user":"madhav","sensorData":[],"__v":0},{"_id":"6415ac0d12e72441bbb2a2b8","name":"madhavendu_2","user":"madhav","sensorData":[],"__v":0},{"_id":"6415adc8b9dbb04790767fed","name":"as","user":"am","sensorData":[],"__v":0},{"_id":"6415add7b9dbb04790767ff1","name":"as","user":"am","sensorData":[],"__v":0},{"_id":"6415b7652ebef9ed8b60d700","name":"s","user":"asa","sensorData":[],"__v":0},{"_id":"6415b7ef2ebef9ed8b60d707","name":"mn","user":"a","sensorData":[],"__v":0},{"_id":"6415fbeb5f0ea699b6cb52b9","name":"ww","user":"vv","sensorData":[],"__v":0},{"_id":"6416260259efca08171ca9d1","name":"bn","user":"as","sensorData":[],"__v":0},{"_id":"6416d6d2c0bd086879947175","name":"Test Device","user":"testuser","sensorData":[],"__v":0},{"_id":"6416e44a1aef5e012bdfa435","name":"madhav123","user":"madhav","sensorData":[],"__v":0}]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/


/**
* @api {get} /api/airsystem All AircondtioningDevices An array of all devices
* @apiGroup Devices
* @apiSuccessExample {json} Success-Response:
*[{"_id":"64159ab82b464968a628dab5","name":"Bob's Samsung Galaxy","user":"bob","sensorData":[{"ts":"1529545935","temp":14,"loc":{"lat":-37.839587,"lon":145.101386}}],"id":4},{"_id":"64159ab82b464968a628dab6","id":0,"name":"Alex's iPhone","user":"alex","sensorData":[{"ts":"1529542230","temp":12,"loc":{"lat":-37.84674,"lon":145.115113}},{"ts":"1529572230","temp":17,"loc":{"lat":-37.850026,"lon":145.117683}}]},{"_id":"64159ab82b464968a628dab7","id":2,"name":"Sam's iPhone","user":"sam","sensorData":[{"ts":"1529572230","temp":14,"loc":{"lat":-37.850026,"lon":145.117683}}]},{"_id":"64159f709ba3fa31fd1c27f2","name":"madhav123","user":"madhav","sensorData":[],"__v":0},{"_id":"6415a3b0a6dd2b78862c4f89","name":"as","user":"as","sensorData":[],"__v":0}]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

/**
* @api {get} /api/securitysystem All  securitysystem An array of all devices
* @apiGroup Devices
* @apiSuccessExample {json} Success-Response:
*[{"_id":"6415bbc5f946efcdfaa9832d","id":2,"name":"Sam's iPhone","user":"sam","sensorData":[{"ts":"1529572230","temp":14,"loc":{"lat":-37.850026,"lon":145.117683}}]},{"_id":"6415bbc5f946efcdfaa9832e","id":0,"name":"Alex's iPhone","user":"alex","sensorData":[{"ts":"1529542230","temp":12,"loc":{"lat":-37.84674,"lon":145.115113}},{"ts":"1529572230","temp":17,"loc":{"lat":-37.850026,"lon":145.117683}}]},{"sensorData":[],"_id":"6415bbc5f946efcdfaa9832f","name":"as","user":"as","id":5},{"_id":"6415bbc5f946efcdfaa98330","name":"Bob's Samsung Galaxy","user":"bob","sensorData":[{"ts":"1529545935","temp":14,"loc":{"lat":-37.839587,"lon":145.101386}}],"id":4},{"_id":"6415be0df9f8f476786a5006","name":"oppos1","user":"Camera","sensorData":[],"__v":0},{"_id":"6415be9af9f8f476786a5010","name":"a","user":"a","sensorData":[],"__v":0},{"_id":"6415bec8f9f8f476786a5015","name":"ss","user":"aa","sensorData":[],"__v":0}]
*@apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/


app.get('/api/devices', async (req, res) =>{
Device.find().then(response => {
  res.status(200).send(response);
}).catch(error => {
  res.status(500).send(error);
});
})



app.get('/api/airsystem', async (req, res) => {
Aitsystem.find().then(response => {
    res.status(200).send(response);
  }).catch(error => {
    res.status(500).send(error);
  });
});


app.get('/api/securitysystem', async (req, res) => {
  Securitysystem.find().then(response => {
      res.status(200).send(response);
    }).catch(error => {
      res.status(500).send(error);
    });
  });


app.post('/api/devices', async (req, res) => {
  const { name, user, sensorData } = req.body;
  const newDevice = new Device({
    name,
    user,
    sensorData
  });
  try{

    await newDevice.save()
  }
  catch(error)
  {
    res.status(500).send(error);
  }
    
});

app.post('/api/airsystem', async (req, res) => {
  const { name, user, sensorData } = req.body;
  const newAitsystem = new Aitsystem({
    name,
    user,
    sensorData
  });
  try {
    await newAitsystem.save();
    res.status(201).send('Aitsystem added successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/securitysystem', async (req, res) => {
  const { name, user, sensorData } = req.body;
  const newAitssystem = new Securitysystem({
    name,
    user,
    sensorData
  });
  try {
    await newAitssystem.save();
    res.status(201).send('Aitsystem added successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});


app.delete('/api/devices/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      res.status(404).send('Device not found');
    } else {
      res.status(200).send('Device deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/airsystem/:id', async (req, res) => {
  try {
    const system = await Aitsystem.findByIdAndDelete(req.params.id);
    if (!system) {
      res.status(404).send('System not found');
    } else {
      res.status(200).send('System deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/securitysystem/:id', async (req, res) => {
  try {
    const system = await Securitysystem.findByIdAndDelete(req.params.id);
    if (!system) {
      res.status(404).send('System not found');
    } else {
      res.status(200).send('System deleted successfully');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});



