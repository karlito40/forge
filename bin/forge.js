#!/usr/bin/env node

const Forge = require('../index')
, fs = require('fs');

var args = process.argv.slice(2);
if(args.indexOf('-f') != -1) {

  var filename = args[args.indexOf('-f') + 1];
  var contentFile = fs.readFileSync(filename, 'utf-8');
  var structure = JSON.parse(contentFile);

  Forge.create(structure)
} else {
  Forge.create(args);
}
