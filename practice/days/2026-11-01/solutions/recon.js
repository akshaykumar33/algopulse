const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      sum += s.charCodeAt(i);
    }
    let p = 1;
    while (p * 2 <= sum) {
      p *= 2;
    }
    out.push(sum - p);
  }
  console.log(out.join('\n'));
}

solve();
