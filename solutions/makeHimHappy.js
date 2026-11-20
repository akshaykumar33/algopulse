const fs = require('fs');
function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length === 0 || input[0] === '') return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const k = parseInt(input[ptr++], 10);
  const minTime = new Map();
  for (let i = 0; i < n; i++) {
    const v = parseInt(input[ptr++], 10);
    const t = Math.min(i + 1, n - i);
    if (!minTime.has(v) || t < minTime.get(v)) {
      minTime.set(v, t);
    }
  }
  let best = 1e9;
  for (const [u, t1] of minTime.entries()) {
    const v = k - u;
    if (v !== u && minTime.has(v)) {
      const cur = Math.max(t1, minTime.get(v));
      if (cur < best) best = cur;
    }
  }
  console.log(best === 1e9 ? -1 : best);
}
solve();