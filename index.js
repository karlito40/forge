const fs = require('fs');
const { promisify, isObject } = require('util');

module.exports.create = create;

const writeFile = promisify(fs.writeFile);

const mkdir = function(path){
  return new Promise(function(resolve, reject){
    fs.mkdir(path, function(err, res){
      resolve((err) ? false : true);
    })
  })
};

const existPath = function(path) {
  return new Promise(function(resolve, reject){
    fs.stat(path, function(err, res){
      resolve((err) ? false : true);
    });
  })
}

function create(project) {
  var promises = [];
  project.forEach(function(mixed){
    if(isObject(mixed)) {
      promises.push(createPath(mixed.path, mixed.content));
    } else {
      promises.push(createPath(mixed));
    }
  });

  return Promise.all(promises);
}

function createFolder(path) {
  return mkdir(path);
}

function createFolders(folders) {
  if(!folders.length) {
    return Promise.resolve();
  }

  var path = folders.shift();
  var p = createFolder(path);

  folders.forEach(function(name) {
    path += '/' + name;
    p = p.then(createFolder.bind(null, path));
  });

  return p;
}

function createPath(path, content) {
  var folders = path.split('/');

  var file = (folders[folders.length - 1].indexOf('.') != -1)
            ? folders.pop()
            : null;

  var p = createFolders(folders);
  if(file) {
    p = p.then(createFile.bind(null, path, content));
  }

  return p;
}

function createFile(path, content) {
  return existPath(path)
    .then(function(exist){
      if(!exist) {
        return writeFile(path, content || '');
      }

      return null;
    });
}
