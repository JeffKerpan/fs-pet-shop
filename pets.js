'use strict';

var fs = require('fs');
// var pets = require('./pets.json');
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    if (err) {
      throw err;
    } else if (process.argv[3] == -1 || process.argv[3] > JSON.parse(data).length -1) {
      console.error('Usage: node pets.js [read | create | update | destroy]');
      process.exit(1);
    } else if (!process.argv[3]) {
      console.log(JSON.parse(data));
    } else if (process.argv[3]){
      var pets = JSON.parse(data);
      console.log(pets[process.argv[3]]);
    }

    // console.log(pets);
    
  });
} else if (cmd === 'create') {
  fs.readFile('./pets.json', 'utf8', function(readErr, data) {
  if (readErr) {
    throw readErr;
  }

  var pets = JSON.parse(data);
  var age = process.argv[3];
  var kind = process.argv[4];
  var name = process.argv[5];
  var obj = {};

  if (!age || !kind || !name) {
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  } else {
    obj.age = parseInt(age);
    obj.kind = kind;
    obj.name = name;

    pets.push(obj);
    var petsJSON = JSON.stringify(pets);

    fs.writeFile('./pets.json', petsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }
    });
  }

    console.log(obj);
});
}

else {
  console.error('Usage: node pets.js [read | create | update | destroy]');
  process.exit(1);
}
