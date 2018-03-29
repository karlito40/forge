const { promisify } = require('util');
const should = require('should');
const Forge = require('../index');
const fs = require('fs');

const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

describe('Forge', () => {
  describe('#create', () => {
    it('should be able to generate a project', async () => {
      const project = [
        __dirname + '/foo/subfoo/file_a.js',
        './foo/subfoo/file_b.js',
        'foo/empty_dir',
        { path: 'foo/file_with_text.js', content: 'Hello !' }
      ];

      await clean();

      let oldCwd = process.cwd();
      process.chdir(__dirname);

      await Forge.create(project);

      readFile(project[0]).should.be.fulfilled();
      readFile(project[1]).should.be.fulfilled();
      readdir(project[2]).should.be.fulfilled();
      readFile(project[3].path, 'utf-8').should.be.fulfilledWith('Hello !');

      await clean();
      process.chdir(oldCwd);
    });
  });
});


async function clean() {
  try { await unlink(__dirname + '/foo/subfoo/file_a.js');} catch(e) {}
  try { await unlink(__dirname + '/foo/subfoo/file_b.js');} catch(e) {}
  try { await unlink(__dirname + '/foo/file_with_text.js');} catch(e) {}
  try { await rmdir(__dirname + '/foo/subfoo');} catch(e) {}
  try { await rmdir(__dirname + '/foo/empty_dir');} catch(e) {}
  try { await rmdir(__dirname + '/foo'); console.log('done');} catch(e) {}
}
