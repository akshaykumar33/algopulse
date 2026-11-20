const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 3) return;
  const n = parseInt(input[0], 10);
  const k = parseInt(input[1], 10);
  const s = input[2];

  let best = null;
  for (let len = 1; len <= n; len++) {
    const sub = s.slice(0, len);
    let full = '';
    while (full.length < k) {
      full += sub;
    }
    const cand = full.slice(0, k);
    if (best === null || cand < best) {
      best = cand;
    }
  }

  console.log(best);
}

solve();
