const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const MOD = 1000000007;
  let cap = 100005;
  let a = new Int32Array(cap);
  let to = new Int32Array(cap);
  let fixed = new Uint8Array(cap);
  let vis = new Uint8Array(cap);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    if (n + 1 > cap) {
      cap = n + 1;
      a = new Int32Array(cap);
      to = new Int32Array(cap);
      fixed = new Uint8Array(cap);
      vis = new Uint8Array(cap);
    }
    for (let i = 0; i < n; i++) {
      a[i] = parseInt(tokens[ptr++], 10);
    }
    for (let i = 0; i < n; i++) {
      to[a[i]] = parseInt(tokens[ptr++], 10);
    }
    for (let i = 0; i < n; i++) {
      const d = parseInt(tokens[ptr++], 10);
      fixed[a[i]] = d !== 0 ? 1 : 0;
      vis[i + 1] = 0;
    }
    let ans = 1;
    for (let i = 1; i <= n; i++) {
      if (vis[i]) continue;
      let cur = i;
      let len = 0;
      let hasFixed = 0;
      while (!vis[cur]) {
        vis[cur] = 1;
        len++;
        if (fixed[cur]) hasFixed = 1;
        cur = to[cur];
      }
      if (len > 1 && !hasFixed) {
        ans = (ans * 2) % MOD;
      }
    }
    out.push(ans);
  }
  console.log(out.join('\n'));
}

solve();
