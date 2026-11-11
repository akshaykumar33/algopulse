const fs = require('fs');

function solve() {
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (!raw) return;
  const tokens = raw.split(/\s+/);
  let ptr = 0;

  const n = parseInt(tokens[ptr++], 10);
  const m = parseInt(tokens[ptr++], 10);
  const words = new Array(n);
  for (let i = 0; i < n; i++) {
    words[i] = tokens[ptr++];
  }

  const MOD = 1000000007;
  let ans = 1;
  const seen = new Uint8Array(26);

  for (let j = 0; j < m; j++) {
    seen.fill(0);
    let cnt = 0;
    for (let i = 0; i < n; i++) {
      const ch = words[i].charCodeAt(j) - 65;
      if (!seen[ch]) {
        seen[ch] = 1;
        cnt++;
      }
    }
    ans = (ans * cnt) % MOD;
  }

  console.log(ans);
}

solve();
