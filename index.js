const fs = require('fs')
, JS = require('constant-list').JS
, denodeify = require('promise').denodeify;

module.exports.create = create;

const writeFile = denodeify(fs.writeFile);

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
  project.forEach(function(mixed){
    if(typeof mixed == JS.OBJECT) {
      createPath(mixed.path, mixed.content);
    } else {
      createPath(mixed);
    }
  });
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
    p.then(createFolder.bind(null, path));
  });


  return p;
}

function createPath(path, content) {
  if(path[0] == '/' || path[0] == '.') {
    console.log(`${path} has been ignored. ['../', './', '/'] are not supported.`)
    return;
  }

  var folders = path.split('/');

  var file = (folders[folders.length- 1].indexOf('.') != -1)
            ? folders.pop()
            : null;

  var p = createFolders(folders);
  if(file) {
    p.then(createFile.bind(null, path, content));
  }

  return p;
}

function createFile(path, content) {
  existPath(path)
    .then(function(exist){
      if(!exist) {
        return writeFile(path, content || '');
      }

      return null;
    });
}
