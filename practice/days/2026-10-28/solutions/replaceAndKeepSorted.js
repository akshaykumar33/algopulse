const fs = require('fs');

function solve() {
  const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!tokens || tokens.length === 0 || tokens[0] === '') return;
  let ptr = 0;
  const n = parseInt(tokens[ptr++], 10);
  const q = parseInt(tokens[ptr++], 10);
  const k = BigInt(tokens[ptr++]);

  const a = new Array(n + 1);
  for (let i = 1; i <= n; i++) {
    a[i] = BigInt(tokens[ptr++]);
  }

  const pref = new Array(n + 1).fill(0n);
  for (let i = 2; i < n; i++) {
    const cost = a[i + 1] - a[i - 1] - 2n;
    pref[i] = pref[i - 1] + cost;
  }
  for (let i = n; i <= n; i++) {
    pref[i] = pref[i - 1];
  }

  const out = [];
  for (let i = 0; i < q; i++) {
    const l = parseInt(tokens[ptr++], 10);
    const r = parseInt(tokens[ptr++], 10);
    if (l === r) {
      out.push((k - 1n).toString());
    } else {
      let ans = (a[l + 1] - 2n) + (k - a[r - 1] - 1n);
      if (r - l > 1) {
        ans += (pref[r - 1] - pref[l]);
      }
      out.push(ans.toString());
    }
  }

  console.log(out.join('\n'));
}

solve();

