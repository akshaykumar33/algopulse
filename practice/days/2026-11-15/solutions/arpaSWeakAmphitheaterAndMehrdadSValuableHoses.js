const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
  if (!input || input.length < 4) return;
  let ptr = 0;
  const n = parseInt(input[ptr++], 10);
  const m = parseInt(input[ptr++], 10);
  const W = parseInt(input[ptr++], 10);

  const w = [0];
  for (let i = 0; i < n; i++) w.push(parseInt(input[ptr++], 10));
  const b = [0];
  for (let i = 0; i < n; i++) b.push(parseInt(input[ptr++], 10));

  const parent = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) parent[i] = i;

  function find(x) {
    while (x !== parent[x]) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  function union(x, y) {
    const rx = find(x);
    const ry = find(y);
    if (rx !== ry) parent[rx] = ry;
  }

  for (let i = 0; i < m; i++) {
    union(parseInt(input[ptr++], 10), parseInt(input[ptr++], 10));
  }

  const groups = new Map();
  for (let i = 1; i <= n; i++) {
    const r = find(i);
    if (!groups.has(r)) groups.set(r, []);
    groups.get(r).push(i);
  }

  const dp = new Int32Array(W + 1);

  for (const members of groups.values()) {
    let totalW = 0, totalB = 0;
    for (const id of members) {
      totalW += w[id];
      totalB += b[id];
    }

    const nextDp = new Int32Array(dp);

    for (let cap = W; cap >= 0; cap--) {
      for (const id of members) {
        if (cap >= w[id]) {
          const val = dp[cap - w[id]] + b[id];
          if (val > nextDp[cap]) nextDp[cap] = val;
        }
      }
      if (cap >= totalW) {
        const val = dp[cap - totalW] + totalB;
        if (val > nextDp[cap]) nextDp[cap] = val;
      }
    }

    for (let cap = 0; cap <= W; cap++) dp[cap] = nextDp[cap];
  }

  let ans = 0;
  for (let cap = 0; cap <= W; cap++) {
    if (dp[cap] > ans) ans = dp[cap];
  }
  console.log(ans);
}

solve();
