const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (tokens.length === 0 || tokens[0] === '') return;

  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);

  const a = new Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = parseInt(tokens[ptr++], 10);
  }

  const prefL = new BigInt64Array(n + 1);
  for (let i = 2; i <= n; i++) {
    const diff = a[i - 1] - a[i];
    prefL[i] = prefL[i - 1] + (diff > 0 ? BigInt(diff) : 0n);
  }

  const prefR = new BigInt64Array(n + 1);
  for (let i = n - 1; i >= 1; i--) {
    const diff = a[i + 1] - a[i];
    prefR[i] = prefR[i + 1] + (diff > 0 ? BigInt(diff) : 0n);
  }

  const out = [];
  for (let q = 0; q < m; q++) {
    const s = parseInt(tokens[ptr++], 10);
    const t = parseInt(tokens[ptr++], 10);

    if (s < t) {
      out.push((prefL[t] - prefL[s]).toString());
    } else {
      out.push((prefR[t] - prefR[s]).toString());
    }
  }

  console.log(out.join('\n'));
}

solve();
