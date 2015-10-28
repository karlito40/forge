Generate a list of files or folders.

## Example

```
const Forge = require('forge');

Forge.create([
  'foo/subfoo/file_a.js',
  'foo/subfoo/file_b.js',
  'foo/subfoo/subsubfoo/file_c.js',
  'sample.js',
  'another_dir/empty_dir',
  {path: 'file_with_text.js', content: 'Hello !'} // Initialize a file with some content
])
```
