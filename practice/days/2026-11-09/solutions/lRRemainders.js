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
    const m = BigInt(tokens[ptr++]);
    const a = new Array(n);
    for (let i = 0; i < n; i++) {
      a[i] = BigInt(tokens[ptr++]);
    }
    const s = tokens[ptr++];

    let l = 0;
    let r = n - 1;
    const rem = new Array(n);
    for (let i = 0; i < n; i++) {
      if (s[i] === 'L') {
        rem[i] = a[l++];
      } else {
        rem[i] = a[r--];
      }
    }

    const ans = new Array(n);
    let cur = rem[n - 1] % m;
    ans[n - 1] = cur.toString();

    for (let i = n - 2; i >= 0; i--) {
      cur = (cur * (rem[i] % m)) % m;
      ans[i] = cur.toString();
    }

    out.push(ans.join(' '));
  }

  console.log(out.join('\n'));
}

solve();
