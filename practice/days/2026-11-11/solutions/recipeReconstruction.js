const fs = require('fs');

function solve() {
  const input = fs.readFileSync(0, 'utf-8').trim();
  if (!input) return;
  const tokens = input.split(/\s+/);
  let ptr = 0;
  const t = parseInt(tokens[ptr++], 10);
  const mod = 10000009;
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    const s = tokens[ptr++];
    let l = 0;
    let r = s.length - 1;
    let ans = 1;
    while (l <= r) {
      const cl = s[l];
      const cr = s[r];
      if (l === r) {
        if (cl === '?') ans = (ans * 26) % mod;
      } else if (cl === '?' && cr === '?') {
        ans = (ans * 26) % mod;
      } else if (cl !== '?' && cr !== '?' && cl !== cr) {
        ans = 0;
        break;
      }
      l++;
      r--;
    }
    out.push(ans);
  }

  console.log(out.join('\n'));
}

solve();
