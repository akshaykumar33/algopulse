const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  let px = 0;
  let py = 0;
  let ans = 1;
  for (let i = 0; i < n; i++) {
    const x = parseInt(tokens[ptr++], 10);
    const y = parseInt(tokens[ptr++], 10);
    let l = px > py ? px : py;
    if (px === py) l++;
    const r = x < y ? x : y;
    if (r >= l) ans += r - l + 1;
    px = x;
    py = y;
  }
  console.log(ans);
}

solve();
