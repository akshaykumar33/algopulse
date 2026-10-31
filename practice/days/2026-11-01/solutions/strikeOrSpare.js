const fs = require('fs');
function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let i = 0; i < t; i++) {
    const n = parseInt(tokens[ptr++], 10);
    const half = Math.floor(n / 2);
    let denom = '1';
    for (let j = 0; j < half; j++) {
      denom += '0';
    }
    out.push('1 ' + denom);
  }
  console.log(out.join('\n'));
}
solve();
