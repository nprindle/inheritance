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
const toolLines = ['# Tools\n'];
for (let k in processor.tools.items) {
  tool = processor.tools.items[k];
  toolLines.push(`## ${tool._name}\n`);
  toolLines.push(`Cost: ${tool.cost.toString()}\n`);
  toolLines.push(`${tool.effectsString()}\n`);
  if (tool.usesPerTurn < Infinity) {
    toolLines.push(`Usable ${tool.usesPerTurn} time(s) per turn.\n`);
  }
}
fs.writeFileSync('_tools.md', toolLines.join('\n'));
