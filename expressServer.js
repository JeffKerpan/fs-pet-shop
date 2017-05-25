const express = require('express');
const app = express();
const fs = require('fs');

// const petsFile = fs.readFile('pets.json');


app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    var parsed = JSON.parse(data);
    res.send(parsed);
  });
});

app.get('/pets/:num', function(req, res, next) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    var parsed = JSON.parse(data);
    if (req.params.num < parsed.length && req.params.num >= 0) {
      // console.log('MADE TO IF');
      // console.log(parsed);
      res.send(parsed[req.params.num]);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get('/', function(req, res) {
  res.send('Hello from API');
});

// app.use((req, res, next) => {
//   res.status(404).send('Not Found');
// });

app.listen(8000, function() {
  console.log('Server Listening');
});

module.exports = app;
