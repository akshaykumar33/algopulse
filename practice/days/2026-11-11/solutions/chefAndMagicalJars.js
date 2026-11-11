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
    let ans = 1;
    for (let i = 0; i < n; i++) {
      ans += parseInt(tokens[ptr++], 10) - 1;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
