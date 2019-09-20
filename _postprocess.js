processor = [];
window = {
  innerHeight: 0,
  console: {
    log: function(x) {
      processor.push(x);
    }
  }
};
require('./built.js');
const fs = require('fs');
console.log(processor);
