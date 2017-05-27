const express = require('express');
const router = express.Router();
const fs = require('fs');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    var animals = JSON.parse(data);
    res.send(animals);
  });
});

router.get('/:id', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data){
    var animals = JSON.parse(data);
    if (req.params.id < 0 || req.params.id >= animals.length) {
      res.sendStatus(404);
    } else {
      res.send(animals[req.params.id]);
    }
  });
});

router.post('/', function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    var animals = JSON.parse(data);
    if (err) {
      res.sendStatus(404);
    } else {
      var body = req.body;
      if (body.age === '' || body.kind === '' || body.name === '') {
        res.sendStatus(400);
      } else {
        animals.push(body);
        fs.writeFile('pets.json', JSON.stringify(animals));
        res.json(animals[2]);
      }
    }
  });
});

router.patch('/:id', jsonParser, function(req, res) {
  // res.sendStatus(404);
  fs.readFile('./pets.json', 'utf8', function(err, data) {

    var animals = JSON.parse(data);
    var body = req.body;
    if (err) {
      res.sendStatus(404);
    } if (req.body.age) {
      console.log(body.age);
      animals[req.params.id].age = body.age;
    } if (req.body.kind) {
      console.log(body.kind);
      animals[req.params.id].kind = body.kind;
    } if (req.body.name) {
      console.log(body.name);
      animals[req.params.id].name = body.name;
    }
      // animals.push(body);
      console.log(animals[req.params.id]);
    fs.writeFile('pets.json', JSON.stringify(animals), function(err) {
      if (err) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
        console.log(animals);
        res.send(animals[req.params.id]);
        // res.json(animals[req.params.id]);
      }
    });
      // res.sendStatus(400);
  });
});

module.exports = router;


// app.post('/pets', function(req, res) {
//   // console.log(req.body);
//   fs.readFile('./pets.json', 'utf8', function(err, data) {
//     console.log(data);
//     if (err) {
//       // res.sendStatus(404);
//     }
//     fs.writeFile('./pets.json', 'Hello Tucker', function(err) {
//       console.log(req.body);
//       res.send(req.body);
//     });
//   });
//   res.send('Sent');
// });
