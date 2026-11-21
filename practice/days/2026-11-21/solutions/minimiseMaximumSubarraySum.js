const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const x = parseInt(input[ptr++], 10);
    const y = parseInt(input[ptr++], 10);
    if (x <= y) {
      out.push(1);
    } else {
      out.push(Math.ceil(x / (y + 1)));
    }
  }
  console.log(out.join('\n'));
}
solve();