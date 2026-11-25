const fs = require('fs');

function solve() {
  const data = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (data.length === 0 || data[0] === '') return;
  let ptr = 0;
  const n = parseInt(data[ptr++], 10);
  const patterns = [];
  for (let i = 0; i < n; i++) patterns.push(data[ptr++].toLowerCase());
  const w = data[ptr++];
  const letter = data[ptr++].toLowerCase();
  const wl = w.toLowerCase();
  const m = w.length;
  const cov = new Uint8Array(m);
  for (let i = 0; i < n; i++) {
    const p = patterns[i];
    const pl = p.length;
    if (pl > m) continue;
    for (let j = 0; j <= m - pl; j++) {
      if (wl.startsWith(p, j)) {
        for (let k = j; k < j + pl; k++) cov[k] = 1;
      }
    }
  }
  const alt = letter === 'a' ? 'b' : 'a';
  let res = '';
  for (let i = 0; i < m; i++) {
    if (!cov[i]) {
      res += w[i];
    } else {
      const ch = wl[i] === letter ? alt : letter;
      const isUpper = w[i] >= 'A' && w[i] <= 'Z';
      res += isUpper ? ch.toUpperCase() : ch;
    }
  }
  console.log(res);
}

solve();
