const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const c = BigInt(tokens[ptr++]);
    const d = BigInt(tokens[ptr++]);

    const arr = new Int32Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = parseInt(tokens[ptr++], 10);
    }
    arr.sort();

    const unique = [];
    for (let i = 0; i < n; i++) {
      if (i === 0 || arr[i] !== arr[i - 1]) {
        unique.push(arr[i]);
      }
    }

    const m = unique.length;
    const dupCost = BigInt(n - m) * c;
    let minCost = BigInt(n) * c + d;

    for (let i = 1; i <= m; i++) {
      const k = BigInt(unique[i - 1]);
      const keep = BigInt(i);
      const del = BigInt(m - i) * c;
      const ins = (k - keep) * d;
      const total = dupCost + del + ins;
      if (total < minCost) minCost = total;
    }

    out.push(minCost.toString());
  }

  console.log(out.join('\n'));
}

solve();
