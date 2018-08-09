Asynchronous project generator

## Example from node

```js
const Forge = require('forge-struct');

Forge.create([
  '/from_an_absolute_path/foo/subfoo/file_a.js',
  './from_a_relative_pathfoo/subfoo/file_b.js',
  '../../dir/file_b.js',
  'foo/subfoo/subsubfoo/file_c.js',
  'sample.js',
  'another_dir/empty_dir',
  {path: 'file_with_text.js', content: 'Hello !'} // Initialize a file with some content
])
.then(() => {
  console.log('Project generate');
});

```

## Example from command line

```bash
npm install forge-struct -g
```

#### Explicit creation
```bash
forge foo/subfoo/file_a.js foo/subfoo/file_b.js foo/subfoo/subsubfoo/file_c.js sample.js another_dir/empty_dir
```

#### Implicit file creation
```bash
forge -f structure.json
```

With structure.json as follow
```js
[
  "foo/subfoo/file_a.js",
  "foo/subfoo/file_b.js",
  "sample.js"
]
```
