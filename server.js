const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const ejs = require('ejs');


const port = 3001;
const base = `${__dirname}`;
const Topic3 = `${__dirname}/Topic3`;
const mqtt =`${__dirname}/mqtt`;
const security = `${__dirname}/security/views`;
app.set('views', path.join(__dirname, 'security', 'views'));


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "TOPIC2")));
app.use(express.static(path.join(__dirname, "Topic3")));

app.get('/', (req, res) => {
  res.sendFile(`${base}/cu.html`);
  console.log(base);
});

app.get('/as', (req, res) => {
  res.sendFile(`${Topic3}/devicelist1.html`);
  console.log(base);
});

app.get('/aws', (req, res) => {
  res.sendFile(`${Topic3}/devicelist2.html`);
  console.log(base);
});

app.get('/amwe', (req, res) => {
  res.sendFile(`${Topic3}/devicelistq.html`);
  console.log(base);
});

app.get('/ankit', (req, res) => {
  res.sendFile(`${mqtt}/mqtt.html`);
  console.log(base);
});

app.get('/madhav', (req, res) => {
  res.sendFile(`${base}/madhav.html`);
});

app.get('/index', (req, res) => {
  res.sendFile(`${base}/index.html`);
});

// Set the view engine to EJS and the path to the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'security', 'views'));

// Render the EJS template on the '/hello' route
// app.get('/login', (req, res) => {
//   res.render('login', {
//     messages: {}
//   });
// });


app.get('/hello', (req, res) => {
  res.render('register');
});

// Render the EJS template on the '/login' route
app.get('/login', (req, res) => {
  res.render('login', {
    messages: {}
  });
});

app.get('/bn', (req, res) => {
  res.render('index');
});




app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
