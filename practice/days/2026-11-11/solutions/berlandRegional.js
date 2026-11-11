const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const u = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      u[i] = parseInt(tokens[ptr++], 10);
    }

    const groups = new Array(n + 1);
    for (let i = 0; i < n; i++) {
      const s = parseInt(tokens[ptr++], 10);
      const id = u[i];
      if (!groups[id]) groups[id] = [];
      groups[id].push(s);
    }

    const ans = new Float64Array(n + 1);
    for (let id = 1; id <= n; id++) {
      const arr = groups[id];
      if (!arr) continue;
      const m = arr.length;
      arr.sort((a, b) => b - a);
      const pref = new Float64Array(m + 1);
      for (let i = 0; i < m; i++) {
        pref[i + 1] = pref[i] + arr[i];
      }
      for (let k = 1; k <= m; k++) {
        const take = m - (m % k);
        ans[k] += pref[take];
      }
    }

    const line = new Array(n);
    for (let k = 1; k <= n; k++) {
      line[k - 1] = String(ans[k]);
    }
    out.push(line.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
