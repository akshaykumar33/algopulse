const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
if (tokens.length && tokens[0] !== '') {
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    if (x === y) {
      out.push(0);
    } else if (x < y) {
      const d = y - x;
      if (d % 2 === 1) out.push(1);
      else if (d % 4 === 0) out.push(3);
      else out.push(2);
    } else {
      const d = x - y;
      if (d % 2 === 0) out.push(1);
      else out.push(2);
    }
  }
  console.log(out.join('\n'));
}
