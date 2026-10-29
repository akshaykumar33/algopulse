const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  const n = parseInt(input[0], 10);
  const m = parseInt(input[1], 10);
  if (m < n) {
    console.log('0');
    return;
  }

  const counts = new Map();
  for (let i = 2; i < 2 + m; i++) {
    const v = parseInt(input[i], 10);
    counts.set(v, (counts.get(v) || 0) + 1);
  }

  const freqs = Array.from(counts.values());
  for (let k = 100; k >= 1; k--) {
    let can = 0;
    for (const f of freqs) {
      can += Math.floor(f / k);
    }
    if (can >= n) {
      console.log(k);
      return;
    }
  }
  console.log('0');
}

solve();
