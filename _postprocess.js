processor = {};
window = {
  innerHeight: 0,
  console: {
    log: function(x, y) {
      processor[x] = y;
    }
  }
};
require('./built.js');
const fs = require('fs');
const toolLines = ['# Tools'];
for (let k in processor.tools.items) {
  tool = processor.tools.items[k];
  toolLines.push(`## ${tool._name}`);
  toolLines.push(`Cost: ${tool.cost.toString()}`);
  toolLines.push(`${tool.effectsString()}`);
}
fs.writeFileSync('_tools.md', toolLines.join('\n'));
