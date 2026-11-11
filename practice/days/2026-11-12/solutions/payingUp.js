const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const m = parseInt(tokens[ptr++], 10);
    const a = [];
    let total = 0;
    for (let i = 0; i < n; i++) {
      const v = parseInt(tokens[ptr++], 10);
      if (v <= m) {
        a.push(v);
        total += v;
      }
    }

    if (m === 0) {
      out.push('Yes');
      continue;
    }
    if (total < m) {
      out.push('No');
      continue;
    }
    if (total === m) {
      out.push('Yes');
      continue;
    }

    if (m <= 100000) {
      const dp = new Uint8Array(m + 1);
      dp[0] = 1;
      for (let i = 0; i < a.length; i++) {
        const v = a[i];
        for (let s = m; s >= v; s--) {
          if (dp[s - v]) dp[s] = 1;
        }
        if (dp[m]) break;
      }
      out.push(dp[m] ? 'Yes' : 'No');
    } else {
      const dfs = (idx, rem) => {
        if (rem === 0) return true;
        if (rem < 0 || idx === a.length) return false;
        return dfs(idx + 1, rem - a[idx]) || dfs(idx + 1, rem);
      };
      out.push(dfs(0, m) ? 'Yes' : 'No');
    }
  }

  console.log(out.join('\n'));
}

solve();
