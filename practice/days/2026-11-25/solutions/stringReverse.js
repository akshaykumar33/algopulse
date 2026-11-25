const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    const n = s.length;
    let j = 0;
    for (let i = 0; i < n; i++) {
      if (s.charCodeAt(i) === s.charCodeAt(n - 1 - j)) j++;
    }
    out.push(n - j);
  }
  console.log(out.join('\n'));
}

solve();
