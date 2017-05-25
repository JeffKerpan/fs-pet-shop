const express = require('express');
const app = express();
const fs = require('fs');
// const petsFile = fs.readFile('pets.json');


app.get('/pets', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    res.send(data);
  });
});

app.get('/', function(req, res) {
  res.send('Hello from API');
});

app.listen(8000, function() {
  console.log('Server Listening');
});
