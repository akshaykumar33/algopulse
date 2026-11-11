const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const total = n * m;

  const grid = new Int32Array(total);
  let maxC = 0;
  for (let i = 0; i < total; i++) {
    const c = parseInt(tokens[ptr++], 10);
    grid[i] = c;
    if (c > maxC) maxC = c;
  }

  const cnt = new Int32Array(maxC + 1);
  const pref = new Float64Array(maxC + 1);
  let ans = 0;

  for (let r = 0; r < n; r++) {
    const base = r * m;
    for (let c = 0; c < m; c++) {
      const col = grid[base + c];
      ans += cnt[col] * r - pref[col];
      cnt[col]++;
      pref[col] += r;
    }
  }

  cnt.fill(0);
  pref.fill(0);

  for (let c = 0; c < m; c++) {
    for (let r = 0; r < n; r++) {
      const col = grid[r * m + c];
      ans += cnt[col] * c - pref[col];
      cnt[col]++;
      pref[col] += c;
    }
  }

  console.log(ans);
}

solve();
