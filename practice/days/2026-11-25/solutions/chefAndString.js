const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\s+/);
let ptr = 0;

function solve() {
  if (!tokens[0]) return;
  const t = parseInt(tokens[ptr++], 10);
  const out = [];
  for (let tc = 0; tc < t; tc++) {
    const n = parseInt(tokens[ptr++], 10);
    const k = parseInt(tokens[ptr++], 10);
    const s = tokens[ptr++];
    let first = -1;
    let last = -1;
    for (let i = 0; i < n; i++) {
      if (s[i] !== 'I') {
        if (first === -1) first = i;
        last = i;
      }
    }
    if (first === -1) {
      out.push(n * k - 1);
      continue;
    }
    const p = first;
    const q = n - 1 - last;
    let internal = 0;
    let prev = s[first];
    for (let i = first + 1; i <= last; i++) {
      if (s[i] === 'I') {
        internal++;
      } else {
        if (s[i] === prev) internal++;
        prev = s[i];
      }
    }
    const boundary = p + q + (s[first] === s[last] ? 1 : 0);
    out.push(k * internal + p + q + (k - 1) * boundary);
  }
  console.log(out.join('\n'));
}

solve();
