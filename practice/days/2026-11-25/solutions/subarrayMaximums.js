const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    if (s[0] === '0' || s[n - 1] === '0') {
      out.push('-1');
      continue;
    }
    const p = new Int32Array(n);
    let l = 0, spare = -1;
    for (let v = n; v >= 2; v--) {
      const cur = s[v - 1];
      const nxt = s[v - 2];
      if (cur === '1' && nxt === '0') {
        spare = l;
        p[l + 1] = v;
        l += 2;
      } else if (cur === '0' && nxt === '1') {
        p[spare] = v;
        spare = -1;
      } else {
        p[l] = v;
        l++;
      }
    }
    p[l] = 1;
    out.push(p.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
