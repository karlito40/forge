Asynchronous project generator

## Example from node

```
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

```
npm install forge-struct -g
```

#### Explicit creation
```
forge foo/subfoo/file_a.js foo/subfoo/file_b.js foo/subfoo/subsubfoo/file_c.js sample.js another_dir/empty_dir
```

#### Implicit file creation
```
forge -f structure.json
```

With structure.json as follow
```
[
  "foo/subfoo/file_a.js",
  "foo/subfoo/file_b.js",
  "sample.js"
]
```
