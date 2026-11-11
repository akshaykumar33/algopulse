const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let cnt = 0;
    for (let i = 1; i < n; i++) {
      if (s[i] !== s[i - 1]) cnt++;
    }
    out.push(cnt >= 2 ? 'Alice' : 'Bob');
  }

  console.log(out.join('\n'));
}

solve();
