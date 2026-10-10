const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).filter(Boolean);
  if (!input.length) return;
  const t = parseInt(input[0], 10);
  const out = [];
  let idx = 1;
  for (let tc = 0; tc < t; tc++) {
    const [n, x, k] = input[idx++].trim().split(/\s+/).map(Number);
    const a = input[idx++].trim().split(/\s+/).map(Number);
    const freq = new Map();
    for (let i = 0; i < n; i++) {
      freq.set(a[i], (freq.get(a[i]) || 0) + 1);
    }
    const scores = Array.from(freq.keys()).sort((p, q) => q - p);
    let cnt = 0;
    const limit = Math.min(k, scores.length);
    for (let i = 0; i < limit; i++) {
      cnt += freq.get(scores[i]);
    }
    out.push(Math.min(x, cnt));
  }
  console.log(out.join('\n'));
}

solve();
