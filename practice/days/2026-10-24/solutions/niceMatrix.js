const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input.length || !input[0]) return;
  let ptr = 0;
  const t = parseInt(input[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= input.length) break;
    const n = parseInt(input[ptr++], 10);
    const m = parseInt(input[ptr++], 10);

    const a = [];
    for (let r = 0; r < n; r++) {
      const row = new Array(m);
      for (let c = 0; c < m; c++) {
        row[c] = BigInt(input[ptr++]);
      }
      a.push(row);
    }

    let ans = 0n;
    const midR = Math.floor((n - 1) / 2);
    const midC = Math.floor((m - 1) / 2);

    for (let r = 0; r <= midR; r++) {
      for (let c = 0; c <= midC; c++) {
        const coords = new Set();
        coords.add(`${r},${c}`);
        coords.add(`${n - 1 - r},${c}`);
        coords.add(`${r},${m - 1 - c}`);
        coords.add(`${n - 1 - r},${m - 1 - c}`);

        const vals = [];
        for (const coord of coords) {
          const [cr, cc] = coord.split(',').map(Number);
          vals.push(a[cr][cc]);
        }
        vals.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

        const median = vals[Math.floor(vals.length / 2)];
        for (const v of vals) {
          const diff = v > median ? v - median : median - v;
          ans += diff;
        }
      }
    }

    out.push(ans.toString());
  }

  console.log(out.join('\n'));
}

solve();
