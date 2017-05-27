const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const fs = require('fs');
const app = express();
const pets = require('./routers/routers.js');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/pets', pets);

app.listen(8000, function() {
  console.log('Server Listening');
});

module.exports = app;
