const fs = require('fs');

function makeDirectoryReferences(dir) {
  let fulldir = `_source/${dir}`;
  let files = fs.readdirSync(fulldir);
  files = files.filter(x => x.endsWith('.ts'));
  let lines = files.map(x => `/// <reference path="${dir}/${x}" />`);
  let file = lines.join('\n');
  fs.writeFileSync(fulldir + '.ts', file + '\n');
}

makeDirectoryReferences('effects');
