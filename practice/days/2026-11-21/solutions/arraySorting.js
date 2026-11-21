const fs = require('fs');
function gcd(a, b) {
  while (b) { const t = a % b; a = b; b = t; }
  return a;
}
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const T = parseInt(input[ptr++], 10);
  const out = [];
  for (let t = 0; t < T; t++) {
    const n = parseInt(input[ptr++], 10);
    let g = 0;
    for (let i = 1; i <= n; i++) {
      const val = parseInt(input[ptr++], 10);
      const diff = Math.abs(val - i);
      if (diff > 0) g = g === 0 ? diff : gcd(g, diff);
    }
    out.push(g);
  }
  console.log(out.join('\n'));
}
solve();